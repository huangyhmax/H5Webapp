/*散点图表组件对象*/
var H5ComponentPoint = function(name,cfg){
    var component = new H5Component( name,cfg);
    // component.text('test H5ComponentPoint');

    var base = cfg.data[0][1];  //以第一个数据的比例为大小的100%

    //输出每个point
    $.each( cfg.data,function(idx,item){
        console.log(idx);
        var point = $('<div class="point point_'+idx+'"></div>');
        // point.text(item[0]+'-'+item[1]);

        var name = $('<div class="name">'+item[0]+'</div>');
        var rate = $('<div class="per">'+(item[1]*100)+'%'+'</div>');
        name.append(rate);
        point.append(name);

        var per = (item[1] /base)*100+'%';
        console.log(per);
        point.width(per).height(per);
        if(item[2]){
            point.css('background-color',item[2])
        }
        if(item[3] != undefined && item[4] != undefined){
            point.css('top',item[4]).css('left',item[3]);
            /*注意：这里的top的大小-60%和120%，就是相对h5_component_point这个父节点而言，父节点是150px/150px的宽高*/
        }
        component.append( point );
    })


    return component;
}