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
                "droppable" : "true",
                "ondrop":"drop(event)",
                "ondragover":"allowDrop(event)",
                "inner": "a folder"
            };
            var fileref = {
                "tag": "a",
                "href": "",
                "target": "brlz_iframe",
                "inner": ""
            };
            var file = {
                "tag": "div",
                "class": "file",
                "id": "%placeholder%"
            };
            var imageFolder = {
              "tag":"img",
                "src":"folder_blank_file16.png",
                "align":"left",
                "style": "margin-right: 4px;"
            };
            var imageFile = {
                "tag":"img",
                "src":"new_document16.png",
                "align":"left",
                "draggable":"true",
                "ondragstart":"drag(event)",
                "style": "margin-right: 4px;"
            };
            var element = ccm.helper.element(this);
            element.html(ccm.helper.html(that.html.get('root')));
            var structure;
            $.getJSON('struct.json', function (data) {
                structure = data;
                decideContent("node", data.Root);
            });
            function initTree() {

            }
            function decideContent(parent, content) {
                Object.getOwnPropertyNames(content).forEach(function (item) {
                    if (item === "Folder") {
                        displayFolder(parent, content.Folder);
                    }
                    if (item === "File") {
                        displayFile(parent, content.File);
                    }
                });
            }
            function displayFolder(parent, currentFolder) {
                var foldercount = 0;
                currentFolder.forEach(function (fldr) {
                    var newFolder = JSON.parse(JSON.stringify(folder));
                    var newImage = JSON.parse(JSON.stringify(imageFolder));
                    Object.getOwnPropertyNames(fldr).forEach(function (node, ind, root) {
                        if (node === "name") {
                            newFolder.inner = fldr[node];
                            newFolder.id = parent + "_"+foldercount;
                            foldercount++;
                            var lvl = "20px";
                            newFolder.style = "padding-left : "+ lvl;
                            ccm.helper.find(that, '#' + parent).append(ccm.helper.html(newFolder));
                            ccm.helper.find(that, '#' + newFolder.id).append(ccm.helper.html(newImage));
                        }
                        if (node === "content") {
                            if (currentFolder[node] !== "") {
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
                    var newImage = JSON.parse(JSON.stringify(imageFile));
                    newFile.id = parent + "-" + filecount;
                    newRef.href = file.ref;
                    newRef.inner = file.name;
                    filecount++;

                    var lvl = "20px";
                    newFile.style = "padding-left : "+ lvl;


                    ccm.helper.find(that, '#' + parent).append(ccm.helper.html(newFile));
                    var FolderElement = ccm.helper.find(that, '#' + newFile.id);
                    FolderElement.append(ccm.helper.html(newImage));
                    FolderElement.append(ccm.helper.html(newRef));
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