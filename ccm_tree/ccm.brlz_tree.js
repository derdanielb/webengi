ccm.component({
    name: 'brlz_tree',
    config: {
        html: [ccm.store, {local: 'template.json'}]
    },
    Instance: function () {
        this.render = function () {
            var that = this;
            var folder = {
                "tag": "div",
                "class": "folder",
                "id": "%placeholder%",
                "inner": "a folder"
            };
            var fileref = {
                "tag": "a",
                "href": "",
                "target": "_blank",
                "inner": ""
            };
            var file = {
                "tag": "div",
                "class": "file",
                "id": "%placeholder%"
            };
            var style = {
                "paddingLeft" : "0"
            };
            //file.inner = JSON.parse(JSON.stringify(fileref));
            var element = ccm.helper.element(this);
            element.html('Hello, World!');
            element.html(ccm.helper.html(that.html.get('root')));
            //console.log(element.html);
            var structure;
            //var messages_div = ccm.helper.find( that, '#fasdasdas' );
            //messages_div.append(ccm.helper.html(ob));
            $.getJSON('struct.json', function (data) {
                structure = data;
                //console.log(structure);
                decideContent("node", data.Root);
            });
            function initTree() {

            }

            function decideContent(parent, content) {
                console.log(content);
                Object.getOwnPropertyNames(content).forEach(function (item) {
                    if (item === "Folder") {
                        console.log("folders");
                        displayFolder(parent, content.Folder);
                    }
                    if (item === "File") {
                        console.log("files");
                        displayFile(parent, content.File);
                    }
                });
                //console.log(content);
                //if (content.Folder !== "") {
                //    console.log("folder");
                //    displayFolder(parent, content.Folder);
                //}
                //if (content.File !== "") {
                //    console.log("file");
                //    displayFile(parent, content.File);
                //}
            }
            function displayFolder(parent, currentFolder) {
                var foldercount = 0;
                currentFolder.forEach(function (fldr) {
                    console.log(fldr);
                    var newFolder = JSON.parse(JSON.stringify(folder));
                    var newStyle = JSON.parse(JSON.stringify(style));
                    //console.log(currentFolder);
                    Object.getOwnPropertyNames(fldr).forEach(function (node, ind, root) {
                        if (node === "name") {
                            newFolder.inner = fldr[node];
                            newFolder.id = parent + "_"+foldercount;
                            foldercount++;
                            //newStyle.paddingLeft =
                            // var lvl = 10*((newFolder.id).split("_").length - 1)+"px";
                            var lvl = "20px";
                            newFolder.style = "padding-left : "+ lvl;
                            console.log(((newFolder.id).match(/./g) || []).length);
                            console.log(((newFolder.id).split("_").length - 1));
                            //console.log("name is " + currentFolder[node]);
                            //console.log(newFolder);
                            ccm.helper.find(that, '#' + parent).append(ccm.helper.html(newFolder));
                        }
                        if (node === "content") {
                            console.log("sub-node detected");
                            if (currentFolder[node] !== "") {
                                //console.log("sub node not empty");
                                //console.log(currentFolder[node]);
                                decideContent(newFolder.id, fldr[node]);
                            }
                        }
                    })
                })
            }
            function displayFile(parent, filesArray) {
                var filecount = 0;

                filesArray.forEach(function (file) {
                    var newFile = JSON.parse(JSON.stringify(file));
                    var newRef = JSON.parse(JSON.stringify(fileref));

                    newFile.id = parent + "-" + filecount;
                    newRef.href = file.ref;
                    newRef.inner = file.name;
                    //var lvl = 10*(((newFile.id).split("_").length - 1)+1)+"px";
                    var lvl = "20px";
                    newFile.style = "padding-left : "+ lvl;

                    //newFile.inner.href = file.ref;
                    //console.log(newFile);
                    //console.log(newRef);
                    filecount++;
                    //console.log(file.name);
                    //console.log(file.ref);
                    ccm.helper.find(that, '#' + parent).append(ccm.helper.html(newFile));
                    ccm.helper.find(that, '#' + newFile.id).append(ccm.helper.html(newRef));
                })
            }
        }
    }
});

//Data structure
//  Root{}:
//      -Folder[]
//      -File[]
//  Folder{}:
//      -name:string
//      -content:[ Folder || File]
//  File{}:
//      -name:string
//      -ref:url
//