var Component = React.createClass({
    render: function() {
        return (
            <form method="post" encType="multipart/form-data" action="api/images">
                <input name="image" type="file" multiple />
                <input type="submit" value="Submit" />
            </form>
        );
    }
});
ReactDOM.render(
    <Component />,
    document.getElementById('content')
);