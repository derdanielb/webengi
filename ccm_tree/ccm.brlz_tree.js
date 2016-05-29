ccm.component({
    name: 'brlz_tree',
    config: {
        html: [ccm.store, {local: 'template.json'}],
        jquery_ui: [ccm.load,'https://code.jquery.com/ui/1.12.0-rc.2/jquery-ui.min.js']
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
                //console.log(element.find(this).attr("data-chidden"));

                var children = element.find(this).children();

                children.each(function (index, child) {
                    //if (index != 0) {
                    //    element.find(child).toggle('fast');
                    //}
                    //else{
                        if( element.find(child).attr('src') === "folder_blank_file16.png")
                        {
                            element.find(child).attr('src',"folder_blank_file16_folded.png");
                        }else{

                        if( element.find(child).attr('src') === "folder_blank_file16_folded.png")
                            {
                            element.find(child).attr('src',"folder_blank_file16.png");
                        }
                            else{
                            if(!(element.find(child).attr('src') === "c_middle.png" || element.find(child).attr('src') === "c_last.png" || element.find(child).attr('src') === "c_bridge.png"))
                            {
                            element.find(child).toggle('fast');
                        }}
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
                function handleDropEvent(event, ui){
                    console.log(event);
                    console.log(ui);
                    var draggable = ui.draggable;
                    draggable.insertAfter($('#'+event.target.id).children()[0]);
                }
                var foldercount = 0;
                currentFolder.forEach(function (fldr) {
                    var newFolder = JSON.parse(JSON.stringify(folder));
                    var newImage = JSON.parse(JSON.stringify(imageFolder));
                    var newImage2 = JSON.parse(JSON.stringify(imageFolder));

                    //console.log(ccm.helper.find(that, '#' + parent).children.length);

                    var level = (parent.split("_").length -1);
                    //console.log(parent);
                    //console.log(level);
                    Object.getOwnPropertyNames(fldr).forEach(function (node, ind, root) {

                        if (node === "name") {
                            newFolder.inner = fldr[node];
                            newFolder.id = parent + "_" + foldercount;
                            foldercount++;
                            if(foldercount != ccm.helper.find(that, '#' + parent).children.length){
                                newImage2.src = "c_middle.png";
                            }
                            else{
                                newImage2.src = "c_last.png";
                            }

                            var lvl = "20px";
                            //newFolder.style = "padding-left : " + lvl;
                            ccm.helper.find(that, '#' + parent).append(ccm.helper.html(newFolder));
                            for(var i = 0; i < level; i++ ){
                                var newImage3 = JSON.parse(JSON.stringify(imageFolder));
                                newImage3.src = "c_bridge.png";
                                ccm.helper.find(that, '#' + newFolder.id).append(ccm.helper.html(newImage3));
                            }
                            ccm.helper.find(that, '#' + newFolder.id).append(ccm.helper.html(newImage2));
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
                                decideContent(newFolder.id, fldr[node]);
                            }
                        }
                    })
                })
            }

            function displayFile(parent, filesArray) {
                var filecount = 0;
                var level = (parent.split("_").length -1);
                console.log(filesArray.length);

                filesArray.forEach(function (file) {
                    var newFile = JSON.parse(JSON.stringify(file));
                    var newRef = JSON.parse(JSON.stringify(fileref));
                    var newImage = JSON.parse(JSON.stringify(imageFile));
                    var newImage2 = JSON.parse(JSON.stringify(imageFile));
                    newFile.id = parent + "-" + filecount;
                    newRef.href = file.ref;
                    newRef.inner = file.name;
                    newRef.id = parent + "-" + filecount + "ref";
                    filecount++;
                    //console.log(ccm.helper.find(that, '#' + parent).children.length);
                    //console.log(newFile.id);
                    //console.log(filecount);
                    if(filecount < filesArray.length){
                        newImage2.src = "c_middle.png";
                    }
                    else{
                        newImage2.src = "c_last.png";
                    }

                    var lvl = "20px";
                    //newFile.style = "padding-left : " + lvl;


                    ccm.helper.find(that, '#' + parent).append(ccm.helper.html(newFile));
                    var FolderElement = ccm.helper.find(that, '#' + newFile.id);
                    //element.find('div#' + newFile.id).draggable( {
                    //        containment: '#' + newFile.id,
                    //        cursor: 'move'
                    //}
                    //);
                    for(var i = 0; i < level; i++ ){
                        var newImage3 = JSON.parse(JSON.stringify(imageFolder));
                        newImage3.src = "c_bridge.png";
                        ccm.helper.find(that, '#' + newFile.id).append(ccm.helper.html(newImage3));
                    }
                    element.find('div#' + newFile.id).click(function (e) {
                        e.stopPropagation();
                    });
                    element.find('div#' + newFile.id).draggable({
                        cursor: 'move',

                        helper: 'clone',
                        revert: 'invalid',
                        snap:".folder"
                    })
                        //.sortable({
                        //connectWith: ".folder",
                        //
                        //containment : '#node'}).disableSelection();
                    ccm.helper.find(that, '#' + newFile.id).append(ccm.helper.html(newImage2));
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