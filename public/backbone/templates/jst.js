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
           <h3> \
                <span class='label label-default'>Name</span> \
                <strong><%- model.name%></strong> \
            </h3> \
           <h3> \
                <span class='label label-default'>Attributes</span> \
                <span class='btn btn-info add-model'>Add</span> \
           </h3> \
           <div id='add-attribute'></div> \
           <div> \
                <ul id='attributes'> \
                </ul> \
           </div> \
           <h3> \
                <span class='label label-default'>Relationships</span> \
                <span class='btn btn-info add-relationship'>Add</span> \
           </h3> \
           <div id='add-relationship'></div> \
           <div> \
                <ul id='relationships'> \
                </ul> \
           </div> \
        </div> \
    </div> \
    "
);

JST['attributeView'] = _.template(
    "<li> \
        <h4> \
            <span class='label label-default'><%- attr.attribute%></span> \
            : \
            <span class='label label-default'><%- attr.type%></span> \
            <span class='label label-danger remove-attr'>Remove</span> \
        </h4> \
    </li> \
    "
);

JST['addModelView'] = _.template(
    "<div class='row'> \
        <div class='col-md-12 well'> \
            <h4> \
                <span class='label label-default'>Attribute Name</span> \
                <input id= 'attribute-name' type='text'></input> \
            </h4> \
            <h4> \
                <span class='label label-default'>Attribute Type</span> \
                <select id= 'attribute-type'></select> \
            </h4> \
            <h4> \
                <span class='btn btn-info save-model'>Save</span> \
                <span class='btn btn-default'>Cancel</span> \
            </h4> \
        </div> \
    </div> \
    "
);

JST['addRelationshipView'] = _.template(
    "<div class='row'> \
        <div class='col-md-12 well'> \
            <h4> \
                <span class='label label-default'>Relationship Type</span> \
                <select id= 'relationship-type'></select> \
            </h4> \
            <h4> \
                <span class='label label-default'>Relationship </span> \
                <select id= 'relationship-model'></select> \
            </h4> \
            <h4> \
                <span class='btn btn-info save-model'>Save</span> \
                <span class='btn btn-default'>Cancel</span> \
            </h4> \
        </div> \
    </div> \
    "
);
