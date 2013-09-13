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
    "<div class='row list-entry'>\
        <div class='col-md-12'> \
            <h3><%-name %></h3> \
        </div> \
    </div> \
    "
);

JST['modelView'] = _.template(
    "<div class='row'> \
        <div class='col-md-12'> \
           <span class='label label-default'>Name</span> \
           <input type='text' value= <%-model.name%> ></input> \
           <hr> \
           <span class='label label-default'>Attributes</span> \
           <div id='attributes'></div> \
           <span class='label label-default'>Relationships</span> \
           <div id='relationships'></div> \
           <hr> \
        </div> \
    </div> \
    "
);
