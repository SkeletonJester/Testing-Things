//特效配置▼--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const plaShoot = newEffect(18,e => {
	Draw.color(Color.valueOf("BBFFFF"), Color.valueOf("BBFFFF"),e.fin());
    const d = new Floatc2({get(x, y){
	    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 10 + 1);
    }}) 
    Angles.randLenVectors(e.id, 7, 1 + 72 * e.fin(), e.rotation, 75,d);
    const c = new Floatc2({get(x, y){
	    Fill.circle(e.x + x, e.y + y, e.fout() * 4);
    }}) 
    Angles.randLenVectors(e.id, 7, 1 + 54 * e.fin(), e.rotation, 75,c);
})
const plaSmoke = newEffect(30,e => {
	Draw.color(Color.valueOf("BBFFFF"), Color.valueOf("BBFFFF"),e.fin());
	Drawf.tri(e.x, e.y, 3.125, 72 * e.fout(), 180);
	Drawf.tri(e.x, e.y, 3.125, 72 * e.fout(), 0);
})
//数据配置▼--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const colors聚 = [Color.valueOf("BBFFFF"), Color.valueOf("BBFFFF"), Color.valueOf("BBFFFF")];
const tscales聚 = [2.5, 1.5, 1, 0.825];
const lenscales聚 = [1, 1.125, 1.2, 1.25];
const length聚 = 300;
const Width聚 =200
const len聚 = 20;
//子弹配置▼--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const 聚变爆破 = extend(BasicBulletType,{
    range(){
        return length聚;
    },
//更新函数配置▼[特效/伤害] 运用向量--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    update(b){
    	
    	const ang = b.rot()
        
	    if(b.timer.get(1, 4)){
	        Effects.shake(1, 1, b.x, b.y);
			if(Mathf.chance(Time.delta() * 0.7)){
		        //Effects.effect(plaShoot,Color.valueOf("BBFFFF"), b.x, b.y, b.rot());
			}
			
            Damage.collideLine(b, b.getTeam(), this.hitEffect, b.x, b.y, b.rot(), length聚);
            Damage.collideLine(b, b.getTeam(), this.hitEffect, b.x + Angles.trnsx(ang - 90, len聚), b.y + Angles.trnsy(ang - 90, len聚), b.rot(), length聚);
            Damage.collideLine(b, b.getTeam(), this.hitEffect, b.x + Angles.trnsx(ang + 90, len聚), b.y + Angles.trnsy(ang + 90, len聚), b.rot(), length聚);
        }
    },
//子弹绘制▼运用向量--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    draw(b){
    	const ang = b.rot()
        const strl = 3
        //向量配置▼--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        const trx1 = b.x + Angles.trnsx(ang - 90, len聚)
        const try1 = b.y + Angles.trnsy(ang - 90, len聚)
        const trx2 = b.x + Angles.trnsx(ang + 90, len聚)
        const try2 = b.y + Angles.trnsy(ang + 90, len聚)
        //绘制▼激光--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        const baseLen = length聚 * b.fout();
        
        Lines.lineAngle(b.x, b.y, b.rot(), baseLen);
        for(var s = 0; s < 3; s++){
            Draw.color(colors聚[s]);
            for(var i = 0; i < tscales聚.length; i++){
                Lines.stroke(strl * b.fout() * (s == 0 ? 1.5 : s == 1 ? 1 : 0.25) * tscales聚[i]);
                Lines.lineAngle(b.x, b.y, b.rot(), baseLen * lenscales聚[i]);
            }
        }
       
        Draw.reset();
        //绘制▼源--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        Draw.color(Color.valueOf("BBFFFF"));
	    Fill.circle(b.x, b.y, b.fout() * strl * 2);
    	Draw.color(Color.valueOf("BBFFFF"));
	    Fill.circle(b.x, b.y, b.fout() * strl * 1.4);;
	
		
		
    }
})
//子弹基本内容配置▼---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
聚变爆破.damage = 100;
聚变爆破.speed = 10;
聚变爆破.despawnEffect = Fx.none;
聚变爆破.drawSize = 250;
聚变爆破.lifetime = 30;
聚变爆破.bulletWidth = 120; 
聚变爆破.pierce = true;
//炮台基本内容配置▼--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const 终焉 = extendContent(LaserTurret,"终焉",{
	turnToTarget(tile,targetRot){
        const entity = tile.ent();
        //转向配置▼--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        entity.rotation = Mathf.slerpDelta(entity.rotation, entity.angleTo(entity.target), 0.105);
    }
})
终焉.shootCone = 8;
终焉.recoil = 4;
终焉.size = 4;
终焉.expanded = true;
终焉.shootShake = 3
终焉.range = 300
终焉.heatColor = Color.valueOf("#BDE6FF")
终焉.reload = 0.1
终焉.shootDuration = 300
终焉.rotatespeed  =10,
终焉.activeSound = Sounds.beam;
终焉.activeSoundVolume = 3
终焉.shootType = 聚变爆破