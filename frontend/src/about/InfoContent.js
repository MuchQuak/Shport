import "../style/infocontent.scss";

export default function InfoContent(props) {
  if (!props || !props.title) {
    return null;
  }
  const children = () => {
    return props.children ? props.children : null;
  };
  return (
    <div className="infoContent">
      <h1>{props.title}</h1>
      {children()}
    </div>
  );
}
