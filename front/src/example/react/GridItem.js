import { EuiFlexGroup, EuiFlexItem, EuiText, EuiButton, EuiPanel, EuiCard } from "@elastic/eui";

const Content = (props) => {
  function get_url_extension(url) {
    return url.split(/[#?]/)[0].split(".").pop().trim();
  }
  let ext = get_url_extension(props.src);

  let img_ext = ["jpg", "png", "jpeg", "gif", "avif"];
  let vid_ext = ["mp4", "mkv", "avi", "flv"];

  let imgsrc = "https://www.industrialempathy.com/img/remote/ZiClJf-640w.avif";
  let vidsrc = "http://tcpschool.com/lectures/sample_video_mp4.mp4";

  if (img_ext.includes(ext)) {
    return <img src={imgsrc} style={{ width: "360px", height: "auto" }}></img>;
  } else if (vid_ext.includes(ext)) {
    return (
      <video controls style={{ width: "360px", height: "auto" }}>
        <source src={vidsrc}></source>
      </video>
    );
  } else {
    return (
      <img
        src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
        style={{ width: "360px", height: "180px" }}
      ></img>
    );
  }
};

const GridItem = (props) => {
  return (
    <EuiFlexItem>
      <EuiPanel hasShadow={true} hasBorder={true}>
        <EuiFlexGroup direction="column">
          <EuiFlexItem>
            <EuiFlexGroup direction="row" justifyContent="space-between">
              <EuiFlexItem>
                <span style={{ fontWeight: 600, fontSize: 24 }}>{props.product.title}</span>
              </EuiFlexItem>
              <EuiFlexItem>
                <span style={{ fontWeight: 600, "text-align": "right" }}>
                  Ð {props.product.price}
                </span>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
          <EuiFlexItem>
            <span>{props.product.content}</span>
          </EuiFlexItem>
          <EuiFlexItem>
            <Content src={props.product.link} />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPanel>
    </EuiFlexItem>
  );
};

export default GridItem;
