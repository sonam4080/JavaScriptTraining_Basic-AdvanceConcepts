export const ButtonStyles = {
    primary: "btn-primary",
    ghost: "btn-ghost"
};

export default function Button(props) {
    var title = props && props.title ? props.title : "";
    return "[Button " + title + "]";
}
