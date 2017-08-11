/*折线图组件对象*/
/*
所有的图表组件都是基于“基本的图文组件H5ComponentBase类”来实现的
*/
var H5ComponentPolyline = function(name,cfg){
    var component = new H5Component( name,cfg);
    
    //绘制网格线
    var w=cfg.width;
    var h=cfg.height;

    //插入canvans的画布（网格线背景）,以下为固定写法
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width =w;
    cns.height = ctx.height =h;

    //绘制水平网格线 
    var step = 10;
    ctx.beginPath();
    ctx.lineWidth =1;
    ctx.strokeStyle = "#000";

    window.ctx = ctx;

    for(var i=0;i<step+1;i++){
        var y=(h/step)*i;
        ctx.moveTo(0,y);
        ctx.lineTo(w,y);
    }
    //绘制垂直网格线
    step = cfg.data.length+1; //5个数据项，画7条线，取中间5份
    for(var i=0;i<step+1;i++){
        var x=(w/step)*i;
        ctx.moveTo(x,0);
        ctx.lineTo(x,h);
    } 
    ctx.stroke(); //收笔，完成绘制；

    //绘制折线数据
    

    component.append(cns);
    return component;
}