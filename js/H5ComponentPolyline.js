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
    component.append(cns);
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
    var text_w=w/step >> 0;
    for(var i=0;i<step+1;i++){
        var x=(w/step)*i;
        ctx.moveTo(x,0);
        ctx.lineTo(x,h);
        if(cfg.data[i]){
            var text = $('<div class="text"></div>')
            text.text(cfg.data[i][0]);
            text.css('width',text_w).css('left',(x/2))
            component.append(text);
        }
    } 
    ctx.stroke(); //收笔，完成绘制；

    //绘制折线数据，重建一个画布图层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width =w;
    cns.height = ctx.height =h;
    component.append(cns);
    ctx.beginPath();
    ctx.lineWidth =3;
    ctx.strokeStyle = "#FF8878";

    // var x=0;
    // var y=0;
    // ctx.moveTo(10,10);
    // ctx.arc(10,10,5,0,2*Math.PI);
    // ctx.stroke();
    //画点
    var row_x=(w/(cfg.data.length+1));
    for(i in cfg.data){
        var x=row_x*i+row_x;
        var y=h*(1-cfg.data[i][1]);
        ctx.moveTo(x,y);
        ctx.arc(x,y,5,0,2*Math.PI);
        ctx.lineTo(x,y);
    }
    //连线
    ctx.moveTo(row_x,h*(1-cfg.data[0][1]));
    for(i in cfg.data){
        var x=row_x*i+row_x;
        var y=h*(1-cfg.data[i][1]);
        ctx.lineTo(x,y);
    }

    ctx.stroke();

    /*设置取消阴影连线的线*/
    ctx.lineWidth =1;
    ctx.strokeStyle = 'rgba(255,255,255,0)';


    ctx.lineTo(x,h);
    ctx.lineTo(row_x,h);
    ctx.fillStyle='rgba(253,168,168,0.3)';
    ctx.fill();
    //写数据
    for(i in cfg.data){
        var x=row_x*i+row_x;
        var y=h*(1-cfg.data[i][1]);
        ctx.moveTo(x,y);
        ctx.fillStyle=cfg.data[i][2]?cfg.data[i][2]:'#595959';
        ctx.fillText((cfg.data[i][1]*100>>0)+'%',x-10,y-10)  /*>>0是去掉小数*/
    }
    ctx.stroke();
    return component;
}