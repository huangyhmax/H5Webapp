/*雷达图组件对象*/
/*
所有的图表组件都是基于“基本的图文组件H5ComponentBase类”来实现的
*/
var H5ComponentRadar = function(name,cfg){
    var component = new H5Component( name,cfg);

    var w=cfg.width;
    var h=cfg.height;

    //插入canvans的画布（网格线背景）,以下为固定写法
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width =w;
    cns.height = ctx.height =h;
    component.append(cns);
    
    //绘制中心点圆
    var r = w/2;
    var step = cfg.data.length;
    ctx.beginPath();
    ctx.arc(r,r,5,0,2*Math.PI)
    ctx.stroke();

    //绘制外圈圆形
    ctx.beginPath();
    ctx.arc(r,r,r,0,2*Math.PI)
    ctx.stroke();

    //计算多边形的顶点坐标
    //已知：圆心坐标（a,b） 半径r 角度deg
    // rad=(2*Math.PI/360)*(360/step)*i
    // x=a+Math.sin(rad)*r;
    // y=b+Math.cos(rad)*r;

    //绘制网格背景（分面绘制，10份）
    var isBlue=false;
    for(var s=10; s>0; s--){
        console.log(1);
        ctx.beginPath();
        for( var i=0; i<step;i++){
            var rad=(2*Math.PI / 360)*(360/step)*i
            var x=r+Math.sin(rad)*r*(s/10);
            var y=r+Math.cos(rad)*r*(s/10); 
            // ctx.arc(x,y,5,0,2*Math.PI)
            // ctx.moveTo(r,r);
            ctx.lineTo(x,y);
        }
        ctx.fillStyle=(isBlue = !isBlue)?'#99c0ff':'#f1f9ff';
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
    //绘制伞骨图
    for( var i=0; i<step;i++){
        var rad=(2*Math.PI / 360)*(360/step)*i
        var x=r+Math.sin(rad)*r;
        var y=r+Math.cos(rad)*r; 
        // ctx.arc(x,y,5,0,2*Math.PI)
        ctx.moveTo(r,r);
        ctx.lineTo(x,y);
        ctx.strokeStyle="#fff";
        ctx.stroke();
    }

    //数据层的开发，新建新的画布
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width =w;
    cns.height = ctx.height =h;
    component.append(cns);
    
    //实现扇骨线的线的连接
    ctx.strokeStyle="#f00";//定义扇骨线的颜色

    var draw = function(per){
        //每次动态加载前清空画布
        ctx.clearRect(0,0,w,h);

        for(var i=0;i<step;i++){
            var rad=(2*Math.PI / 360)*(360/step)*i
            var rate = cfg.data[i][1] *per;
            var x=r+Math.sin(rad)*r*rate;
            var y=r+Math.cos(rad)*r*rate; 
            ctx.lineTo(x,y);
        }
        ctx.closePath();
        ctx.stroke();


        //实现扇骨线上圆圈的填充
        ctx.fillStyle="#ff7676";
        for(var i=0;i<step;i++){
            var rad=(2*Math.PI / 360)*(360/step)*i
            var rate = cfg.data[i][1] *per;
            var x=r+Math.sin(rad)*r*rate;
            var y=r+Math.cos(rad)*r*rate; 

            ctx.beginPath();
            ctx.arc(x,y,5,0,2*Math.PI)
            ctx.fill();
            ctx.closePath();
        }
        ctx.closePath();
        ctx.stroke();
    }
    draw(0);
    component.on('onLoad',function(){
        //折线生长动画
        var s=0;
        for(i=0;i<100;i++){
            setTimeout(function(){
                s+=.01;
                draw(s);
            },i*10)
        }
        // [0,10,20,30,。。。]动画时间数组
    })
    component.on('onLeave',function(){
         //折线消失动画
         var s=1;
         for(var i=0;i<100;i++){
             setTimeout(function(){
                 s-=.01;
                 draw(s);
             },i*10)
         }
    })
    return component;
}