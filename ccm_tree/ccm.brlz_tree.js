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
                "style" : "cursor: pointer;",
                "inner": "a folder"

            };
            var fileref = {
                "tag": "a",
                "href": "",
                "target": "brlz_iframe",
                "style" : "text-decoration: none",
                "inner": ""
            };
            var file = {
                "tag": "div",
                "class": "file",
                "id": "%placeholder%"
            };
            var imageFolder = {
                "tag": "img",
                "src": "folder_blank_file16.png",
                "align": "left",
                "style": "margin-right: 4px;"
            };
            var imageFile = {
                "tag": "img",
                "src": "new_document16resized.png",
                "align": "left",
                "class": "FileImg",
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

            function hideChildren(e) {
                //console.log(e);
                e.preventDefault();
                e.stopPropagation();
                console.log(element.find(this).attr("data-chidden"));

                var children = element.find(this).children();

                children.each(function (index, child) {
                    if (index != 0) {
                        element.find(child).toggle('fast');
                    }
                    else{
                        if( element.find(child).attr('src') === "folder_blank_file16.png")
                        {
                            element.find(child).attr('src',"folder_blank_file16_folded.png");
                        }else{
                            element.find(child).attr('src',"folder_blank_file16.png");
                        }
                    }
                });

                //console.log(children);
                //console.log(element.find(this).data("childrenhidden"));

                //if(element.find(this).attr("data-chidden") == true)
                //{
                //    element.find(this).removeAttr("data-chidden");
                //    element.find(this).attr("data-chidden", false);
                //    //element.find(this).data("childrenhidden", "false");
                //    children.each(function (index, child) {
                //        //child.removeAttribute('hidden');
                //        element.find(child).toggle show();
                //    })
                //}else
                //{
                //    element.find(this).removeAttr("data-chidden");
                //    element.find(this).attr("data-chidden", true);
                //    //element.find(this).data("childrenhidden", "true");
                //    children.each(function (index, child) {
                //        //console.log(child);
                //        //child.setAttribute('hidden',"true");
                //        element.find(child).hide();
                //
                //    })
                //}
                //element.find(this).unbind('click', hideChildren);
                //element.find(this).on('click', hideChildren);

            };

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
                            newFolder.id = parent + "_" + foldercount;
                            foldercount++;
                            var lvl = "20px";
                            newFolder.style = "padding-left : " + lvl;
                            ccm.helper.find(that, '#' + parent).append(ccm.helper.html(newFolder));
                            ccm.helper.find(that, '#' + newFolder.id).append(ccm.helper.html(newImage));
                            element.find('div#' + newFolder.id).on('click', hideChildren);
                            //element.find('div#' + newFolder.id).on('click', function (e) {
                            //    console.log(e);
                            //    e.stopPropagation();
                            //
                            //    var children = element.find(this).children();
                            //    if(element.find(this).data("childrenhidden"))
                            //    {
                            //        element.find(this).data("childrenhidden", "false");
                            //        children.each(function (index, child) {
                            //            child.hidden = false;
                            //        })
                            //    }else
                            //    {
                            //        element.find(this).data("childrenhidden", "true");
                            //        children.each(function (index, child) {
                            //            child.hidden = true;
                            //        })
                            //    }
                            //
                            //
                            //})
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
                    newRef.id = parent + "-" + filecount + "ref";
                    filecount++;

                    var lvl = "20px";
                    newFile.style = "padding-left : " + lvl;


                    ccm.helper.find(that, '#' + parent).append(ccm.helper.html(newFile));
                    var FolderElement = ccm.helper.find(that, '#' + newFile.id);
                    //element.find('div#' + newFile.id).draggable( {
                    //        containment: '#' + newFile.id,
                    //        cursor: 'move'
                    //}
                    //);
                    element.find('div#' + newFile.id).click(function (e) {
                        e.stopPropagation();
                    });
                    FolderElement.append(ccm.helper.html(newImage));
                    FolderElement.append(ccm.helper.html(newRef));
                    //element.find('.FileImg').draggable({
                    //
                    //    cursor: 'move'
                    //});
                    //element.find('div#' + newFile.id+"ref").draggable( {
                    //
                    //    cursor: 'move'
                    //});
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