import {
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiButton,
  EuiFieldPassword,
  EuiPanel,
  EuiFlexGrid,
} from "@elastic/eui";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Cookies from "js-cookie";
import API from "../../API";

import GridItem from "./GridItem";

function Index() {
  var [products, SetProducts] = useState([]);

  useEffect(() => {
    API.get("/products")
      .then((res) => {
        SetProducts(res.data.products);
      })
      .catch((error) => {
      });
  }, []);

  // let products = await loadProducts();
  // console.log("title:", products[0].title);

  return (
    <EuiFlexGroup>
      <EuiFlexItem grow={true}>
        <EuiFlexGrid>
          {products.map((p) => (
            <GridItem product={p} />
          ))}
          {/* </EuiFlexGroup> */}
        </EuiFlexGrid>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}

export default Index;
