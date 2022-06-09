from flask import Flask, render_template, request, redirect, url_for, make_response, jsonify, abort
from flask_cors import CORS

import sys

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}}, supports_credentials=True)

def read_db():
    db = open('db.txt', 'r')
    lines = db.readlines()
    product = []
    for l in lines:
        temp_l = l.strip().split(';')
        product.append(temp_l)
    return product

def write_db(product):
    with open('db.txt','w+') as f:
        for p in product:
            str = ''
            for item in p:
                str += item + ";"
            str = str[0:-1]
            str += '\n'
            f.write(str)

product_key = ['id', 'title',  'content', 'price', 'link', 'owner']
product = read_db()

def dict_product(id):
    p = {
        product_key[0] : product[id][0],
        product_key[1] : product[id][1],
        product_key[2] : product[id][2],
        product_key[3] : product[id][3],
        product_key[4] : product[id][4],
        product_key[5] : product[id][5],
    }
    return p

def dict_products(user=None):
    ps = { "products" : []}
    for raw_product in product:
        p = {
            product_key[0] : raw_product[0],
            product_key[1] : raw_product[1],
            product_key[2] : raw_product[2],
            product_key[3] : raw_product[3],
            product_key[4] : raw_product[4],
            product_key[5] : raw_product[5],
        }
        if user == None:
            ps["products"].append(p)
        elif raw_product[5] == user:
            ps["products"].append(p)

    return ps

def CORS_response(response):
    new_response = response
    new_response.headers.add('Access-Control-Allow-Origin', '*')
    new_response.headers.add('Access-Control-Allow-Credentials', 'true')
    return new_response

@app.route("/register_post", methods=['POST'])
def register_post():
    if request.method == "POST":
        title = request.form["title"]
        content = request.form['content']
        f = request.files['file']
        print(type(f.filename))
        filename = str(len(product)+1) + "." + f.filename.split(".")[-1]
        f.save("./media/"+ filename)
        print(title, content, filename)
        product.append([title, content, "0.01", filename])
        return redirect(url_for("index"))

@app.route("/register")
def register():
    user = request.cookies.get('user')
    if user != "admin":
        return redirect(url_for("index"))
    return render_template("register.html")

@app.route("/login_post", methods=["POST"])
def login_post():
    if request.method == "POST":
        try:
            user = request.json["name"]
            password = request.json["pass"]
        except Exception as e:
            user = request.form["name"]
            password = request.form["pass"]

        is_admin = user == "admin" and password == "admin"
        is_user = user == "user" and password == "user"

        if request.headers['Accept'] == 'application/json':
            resp = jsonify(
                {
                    'success':(is_user or is_admin),
                    'user':(user or ""),
                    'is_user':is_user,
                    'is_admin':is_admin
                }
            )
        else:
            if is_user or is_admin:
                # if login succeed, redirect to /index
                resp = make_response(redirect('/index'))
            else:
                return "<p>Login Error</p>"

        resp.set_cookie("user", user)

        return resp


@app.route("/login")
def login(name=None):
    return render_template('login.html', name=name)

@app.route("/products")
def products():
    try:
        user = request.args.get('user')
    except:
        user = None

    #     return abort(403)
    resp = jsonify(dict_products(user))
    
    return resp

@app.route("/index")
def index():
    user = request.cookies.get('user')
    if user == None:
        return redirect(url_for("login"))
    return render_template("index.html", user=user, product=product)

@app.route("/buy/<id>", methods=['GET', 'POST'])
def buy(id):
    try:
        user = request.json['user']
    except:
        pass
    if user == None:
        return redirect(url_for("login"))

    try:
        account = request.json['account']
    except:
        pass
    if account == None:
        return "metamask account required"

    idx = 0
    for i, p in enumerate(product):
        if int(p[0]) == int(id):
            idx = i
    print(idx)
    print(request.json)

    nft_link = product[idx][4]
    account = request.json['user']

    # import buy_nft from '../../trade' 포함
    #   nft_link : 이미지 url (db.txt에 기록)
    #   account : etherium 지갑 주소
    # buy_nft(nft_link, account)

    product[idx][5] = user
    write_db(product)
    return jsonify(dict_product(idx))

@app.route("/")
def main():
    user = request.cookies.get('user')
    return CORS_response(redirect(url_for("index")))

if __name__ == '__main__':
    app.run(host="0.0.0.0",port=80, debug=False)

