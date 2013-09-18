window.JST = {}
JST['index'] = _.template(
    "<div class='row'>\
        <div class='col-md-12 view-all-models show-list'> \
            VIEW ALL MODELS \
        </div> \
        <div id='anydata'></div> \
        <div class='col-md-12 view-all-models'> \
            COLLABORATE \
        </div> \
        <div class='col-md-12 view-all-models save-data'> \
            SAVE DATA BABY \
        </div> \
    </div>"
);

JST['listEntry'] = _.template(
    "<div class='col-md-12 list-val'> \
        <strong><%-name %></strong> \
    </div> \
    "
);

JST['modelView'] = _.template(
    "<div class='row'> \
        <div class='col-md-12 align-center uppercase'> \
            <h5> \
                <span>NAME</span> \
            </h5> \
            <h4> \
                <strong><%- model.modelName%></strong> \
            </h4> \
           <h5> \
                <span>ATTRIBUTES</span> \
                <span class='add-model'>ADD</span> \
           </h5> \
           <div id='add-attribute'></div> \
           <div> \
                <ul id='attributes'> \
                </ul> \
           </div> \
           <h5> \
                <span>Relationships</span> \
                <span class='add-relationship'>ADD</span> \
           </h5> \
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
    "<h4> \
        <strong class='btn-col remove-attr'>x</strong> \
        <span><%- attr.attribute%></span> \
        : \
        <span><%- attr.type%></span> \
    </h4> \
    "
);

JST['relationshipView'] = _.template(
    "<h4> \
        <span class='btn-col remove-rel'>X</span> \
        <span><%- rel.type%></span> \
        : \
        <span><%- rel.withModel%></span> \
    </h4> \
    "
);

JST['addModelView'] = _.template(
    "<div class='row'> \
        <div class='col-md-12'> \
            <hr> \
            <h5> \
                <span>Attribute Name</span> \
                <input id= 'attribute-name' type='text'></input> \
            </h5> \
            <h5> \
                <span>Attribute Type</span> \
                <select id= 'attribute-type'></select> \
            </h5> \
            <h5> \
                <span class='btn-col save-model'>Save</span> \
                <span class='btn-col cancel'>Cancel</span> \
            </h5> \
            <hr> \
        </div> \
    </div> \
    "
);

JST['addRelationshipView'] = _.template(
    "<div class='row'> \
        <div class='col-md-12'> \
            <hr> \
            <h5> \
                <span>Relationship Type</span> \
                <select id= 'relationship-type'></select> \
            </h5> \
            <h5> \
                <spa>Relationship </span> \
                <select id= 'relationship-model'></select> \
            </h5> \
            <h5> \
                <span class='btn-col save-model'>Save</span> \
                <span class='btn-col cancel'>Cancel</span> \
            </h5> \
            <hr> \
        </div> \
    </div> \
    "
);
