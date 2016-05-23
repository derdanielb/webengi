
ccm.component( {
    name: 'brlz_tree',
    config: {
        html:  [ ccm.store, { local: 'template.json' } ]
    },
    Instance: function () {
        this.render = function () {
            var that = this;
            var element = ccm.helper.element(this);
            element.html( 'Hello, World!' );
            element.html( ccm.helper.html( this.html.get( 'folder' ) ) );
            console.log(element.html);
            var structure;
            $.getJSON('struct.json', function(data) {
                structure = data;
                console.log(structure);
                //console.log(data.hasOwnProperty("Folder"));
                displayFolder(null,data.Folder);
            });
            function initTree(){

            }
            function decideContent(content){
                if(content.Folder !== ""){
                    displayFolder(null,content.Folder);
                }
                if(content.File !== ""){
                    displayFile(null,content.File);
                }
            }
            function displayFolder(parent, currentFolder){
                Object.getOwnPropertyNames(currentFolder).forEach(function (node,ind,root) {
                    if(node === "name"){
                        console.log("name is " + currentFolder[node]);
                    }
                    else{
                        if(node === "content"){
                            console.log("sub-node detected");
                            if(currentFolder[node] !== ""){
                                console.log("sub node not empty");
                                console.log(currentFolder[node]);
                                decideContent(currentFolder[node]);
                            }
                        }
                    }
                })

            }
            function displayFile(parent, filesArray){
                filesArray.forEach(function (file) {
                    console.log(file.name);
                    console.log(file.ref);
                })
            }
        }
    }
} );
