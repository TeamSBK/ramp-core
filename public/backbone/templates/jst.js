window.JST = {}
JST['index'] = _.template(
    "<div class='well'> \
        <h1>Model List</h1> \
        <div class='btn btn-info show_list'>Show This!</div> \
        <hr> \
        <div id='anydata'></div> \
    </div>"
);

JST['listEntry'] = _.template(
    "<div class='row'>\
        <div class='col-md-12'> \
            <h3><%-name %></h3> \
        </div> \
    </div> \
    "
);
