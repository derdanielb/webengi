ccm.component({
    name: 'brlz_tree',
    config: {
        html: [ccm.store, {local: 'template.json'}],
        jquery_ui: [ccm.load, 'https://code.jquery.com/ui/1.12.0-rc.2/jquery-ui.min.js']
    },
    Instance: function () {

        //https://code.jquery.com/ui/1.11.4/jquery-ui.min.js
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
                "style": "text-decoration: none",
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
            var veryLastFolder = false;
            var element = ccm.helper.element(this);
            element.html(ccm.helper.html(that.html.get('root')));
            var structure;
            $.getJSON('struct2.json', function (data) {
                structure = data;
                decideContent("node", data.Root, false);
                //console.log(ccm.helper.find(that, '#node'));
                //ccm.helper.find(that, '#node').children().each(function (index, child) {
                //    console.log(child);
                //    toogleHide(child.children());
                //})

            });
            function initTree() {

            }


            function toogleHide(children) {
                children.each(function (index, child) {
                    //if (index != 0) {
                    //    element.find(child).toggle('fast');
                    //}
                    //else{
                    if (element.find(child).attr('src') === "folder_blank_file16.png") {
                        element.find(child).attr('src', "folder_blank_file16_folded.png");
                    } else {

                        if (element.find(child).attr('src') === "folder_blank_file16_folded.png") {
                            element.find(child).attr('src', "folder_blank_file16.png");
                        }
                        else {
                            if (!(element.find(child).attr('src') === "c_middle.png" || element.find(child).attr('src') === "c_last.png" || element.find(child).attr('src') === "c_bridge.png")) {
                                element.find(child).toggle('fast');
                            }
                        }
                    }
                });
            }

            function hideChildren(e) {
                //console.log(e);
                e.preventDefault();
                e.stopPropagation();
                //console.log(element.find(this).attr("data-chidden"));

                var children = element.find(this).children();
                //console.log(children);
                toogleHide(children);

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


            function decideContent(parent, content, flag) {
                Object.getOwnPropertyNames(content).forEach(function (item) {
                    if (item === "Folder") {
                        displayFolder(parent, content.Folder, flag);
                    }
                    if (item === "File") {
                        displayFile(parent, content.File, flag);
                    }
                });
            }

            function displayFolder(parent, currentFolder, flag) {
                function handleDropEvent(event, ui) {
                    //console.log(event);
                    //console.log(ui);
                    var draggable = ui.draggable;
                    draggable.insertAfter($('#' + event.target.id).children()[0]);
                }

                var foldercount = 0;
                currentFolder.forEach(function (fldr) {
                    var newFolder = JSON.parse(JSON.stringify(folder));
                    var newImage = JSON.parse(JSON.stringify(imageFolder));
                    var newConnectorImage = JSON.parse(JSON.stringify(imageFolder));
                    var lastFolderFlag = false;
                    //console.log(ccm.helper.find(that, '#' + parent).children.length);
                    //console.log("parent: " + parent)
                    var level = (parent.split("_").length - 1);
                    //console.log(parent);
                    //console.log(level);
                    var lvl = 20;
                    if (flag) {
                        //if(!veryLastFolder){
                            newFolder.style = "padding-left : " + lvl +"px";
                        //}
                        veryLastFolder = true;

                        level--;
                    }
                    Object.getOwnPropertyNames(fldr).forEach(function (node, ind, root) {

                        if (node === "name") {
                            newFolder.inner = fldr[node];
                            newFolder.id = parent + "_" + foldercount;
                            foldercount++;
                            if (foldercount < currentFolder.length) {
                                newConnectorImage.src = "c_middle.png";
                            }
                            else {
                                newConnectorImage.src = "c_last.png";
                                lastFolderFlag = true;
                            }
                            if (lastFolderFlag) {

                                if (level > 1) {
                                    level--;
                                }
                            }


                            //console.log(level);
                            //console.log(newFolder.inner);
                            if(parent === "node")
                            {
                                lvl = 0;
                            }
                            else {
                                lvl =  20;
                            }

                            newFolder.style = "padding-left : " + lvl +"px";
                            ccm.helper.find(that, '#' + parent).append(ccm.helper.html(newFolder));
                            //for (var i = 0; i < level; i++) {
                            //    var newImage3 = JSON.parse(JSON.stringify(imageFolder));
                            //    newImage3.src = "c_bridge.png";
                            //    newImage3.class = "connector";
                            //    ccm.helper.find(that, '#' + newFolder.id).append(ccm.helper.html(newImage3));
                            //}

                            ccm.helper.find(that, '#' + newFolder.id).append(ccm.helper.html(newConnectorImage));
                            ccm.helper.find(that, '#' + newFolder.id).append(ccm.helper.html(newImage));

                            element.find('div#' + newFolder.id).on('click', hideChildren);
                            element.find('div#' + newFolder.id).droppable({
                                drop: handleDropEvent
                            });
                            //.sortable({
                            //connectWith: ".folder",
                            //revert: "invalid",
                            //containment : '#node'}).disableSelection();
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
                                decideContent(newFolder.id, fldr[node], lastFolderFlag);
                            }
                        }
                    })
                })
            }

            function displayFile(parent, filesArray, flag) {
                var filecount = 0;
                var level = (parent.split("_").length - 1);
                //console.log(filesArray.length);
                var lastFolderFlag = false;


                filesArray.forEach(function (file) {
                    var newFile = JSON.parse(JSON.stringify(file));
                    var newRef = JSON.parse(JSON.stringify(fileref));
                    var newImage = JSON.parse(JSON.stringify(imageFile));
                    var newConnectorImage = JSON.parse(JSON.stringify(imageFile));
                    newFile.id = parent + "-" + filecount;
                    newRef.href = file.ref;
                    newRef.inner = file.name;
                    newRef.id = parent + "-" + filecount + "ref";
                    filecount++;

                    var lvl = "20px";
                    if (flag) {
                        newFile.style = "padding-left : " + lvl;
                        level = level - 1;
                    }

                    //console.log(ccm.helper.find(that, '#' + parent).children.length);
                    //console.log(newFile.id);
                    //console.log(filecount);
                    if (filecount < filesArray.length) {
                        newConnectorImage.src = "c_middle.png";
                    }
                    else {
                        newConnectorImage.src = "c_last.png";
                    }

                    //var lvl = "20px";
                    //newFile.style = "padding-left : " + lvl;
                    lvl =  20;
                    newFile.style = "padding-left : " + lvl +"px";


                    ccm.helper.find(that, '#' + parent).append(ccm.helper.html(newFile));
                    var FolderElement = ccm.helper.find(that, '#' + newFile.id);
                    //element.find('div#' + newFile.id).draggable( {
                    //        containment: '#' + newFile.id,
                    //        cursor: 'move'
                    //}
                    //);
                    //for (var i = 0; i < level; i++) {
                    //    var newImage3 = JSON.parse(JSON.stringify(imageFolder));
                    //    newImage3.src = "c_bridge.png";
                    //    ccm.helper.find(that, '#' + newFile.id).append(ccm.helper.html(newImage3));
                    //}

                    element.find('div#' + newFile.id).click(function (e) {
                        e.stopPropagation();
                    });
                    element.find('div#' + newFile.id).draggable({
                        cursor: 'move',

                        helper: 'clone',
                        revert: 'invalid',
                        snap: ".folder"
                    });
                    //.sortable({
                    //connectWith: ".folder",
                    //
                    //containment : '#node'}).disableSelection();
                    ccm.helper.find(that, '#' + newFile.id).append(ccm.helper.html(newConnectorImage));
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


//"Folder": [{
//    "name": "Subfolder 1.1",
//    "content": {
//
//    }
//}],

//"File": [
//    {
//        "name": "File1.1",
//        "ref": "http://i.imgur.com/72w2Zl6.jpg"
//    }
//]