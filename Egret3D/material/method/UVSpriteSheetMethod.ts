﻿module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.UVSpriteSheetMethod
    * @classdesc
    * 用来实现UV精灵动画的渲染方法 。
    * 一整张贴图中用行列来分割帧动画，然后实现每帧播放。
    * row * col 是总帧数， frameNum是只播放的帧数.
    * 使用方法 需要使用 $mesh.material.diffusePass.addMethod( this ) 向材质中添加效果方法
    * @see egret3d.MethodBase
    * @see egret3d.MaterialPass
    * @includeExample material/method/UVSpriteSheetMethod.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class UVSpriteSheetMethod extends MethodBase {

        private _uvSpriteSheet: Float32Array = new Float32Array(4);

        private _uvRectangle: Rectangle = new Rectangle();
        private _speed: number = 0.0;
        private _time: number = 0.0;
        private _numTime: number = 0.4;
        private _start: boolean = false ;
        private _frameNum: number = 12;
        private _row: number = 4;
        private _column: number = 4;
        private _currentFrame: number = 0;

        private frameList: Array<Rectangle> = [] ;
        private _change: boolean = true;

        private _delayTime: number = 0.0;
        private _isLoop: boolean = true;
        private _currentDelay: number = 0.0;

        /**
        * @language zh_CN
        * 创建一个UV精灵动画的渲染方法对象
        * @param frameNum  帧数量
        * @param row 行数
        * @param column 列数
        * @param numTime 播放总时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(frameNum: number, row: number, column: number, numTime:number ) {
            super();
            this.fsShaderList[ShaderPhaseType.diffuse_fragment] = this.fsShaderList[ShaderPhaseType.diffuse_fragment] || [];
            this.fsShaderList[ShaderPhaseType.diffuse_fragment].push("uvSpriteSheet_fs");

            this.frameNum = frameNum;
            this.row = row;
            this.column = column;
            this.numTime = numTime;
        }

        private caculate() {
            this._change = false;
            this._speed = (this._numTime*1000) / this._frameNum ;

            this._uvRectangle.x = 0.0;
            this._uvRectangle.y = 0.0;
            this._uvRectangle.width = 1.0 / this._row;
            this._uvRectangle.height = 1.0 / this._column;

            this.frameList.length = this._frameNum;

            var rowIndex: number = 0; 
            var columnIndex: number = 0; 
            for (var i: number = 0; i < this._frameNum; i++){
                rowIndex = i % this._row ;
                columnIndex = Math.floor(i / this._column)  ;

                var rec: Rectangle = new Rectangle();
                rec.x = rowIndex * this._uvRectangle.width + this._uvRectangle.x;
                rec.y = columnIndex * this._uvRectangle.height + this._uvRectangle.y;
                rec.width = this._uvRectangle.width;
                rec.height = this._uvRectangle.height;
                this.frameList[i] = rec ;
            }
        }
        
        /**
        * @language zh_CN
        * 设置动画播放总时间
        * @param value 播放总时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set numTime(value: number) {
            if (this._numTime != value) {
                this._change = true;
                this._numTime = value;
            }
        }
        
        /**
        * @language zh_CN
        * 获取动画播放总时间
        * @returns number 播放总时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get numTime(): number {
            return this._numTime;
        }
       
        /**
        * @language zh_CN
        * 设置动画帧数
        * @param value 动画帧数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set frameNum(value: number) {
            if (this._frameNum != value) {
                this._change = true;
                this._frameNum = value;
            }
        }
         
        /**
        * @language zh_CN
        * 获取动画帧数
        * @returns number  动画帧数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get frameNum(): number {
            return this._frameNum;
        }
               
        /**
        * @language zh_CN
        * 设置动画行数
        * @param value 动画行数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set row(value: number) {
            if (this._row != value) {
                this._change = true;
                this._row = value;
            }
        }
                 
        /**
        * @language zh_CN
        * 获取动画行数
        * @returns number  动画行数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get row(): number {
            return this._row;
        }
                       
        /**
        * @language zh_CN
        * 设置动画列数
        * @param value 动画列数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set column(value: number) {
            if (this._column != value) {
                this._change = true;
                this._column = value;
            }
        }
                         
        /**
        * @language zh_CN
        * 获取动画列数
        * @returns number  动画列数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get column(): number {
            return this._column;
        }
                                
        /**
        * @language zh_CN
        * 开始播放uv精灵动画
        * @param rest 如果为ture就是重置播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public start(rest: boolean = false) {
            if (rest) {
                this._time = 0;
                this._currentDelay = 0.0;
                this._currentFrame = 0;
            }
            this._start = true;
        }
                        
        /**
        * @language zh_CN
        * 停止播放uv精灵动画
        * @version Egret 3.0
        * @platform Web,Native
        */
        public stop() {
            this._start = false;
        }

        /**
        * @language zh_CN
        * 获取播放延时时间
        * @returns number 时间 秒
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get delayTime(): number {
            return this._delayTime / 1000.0;
        }

        /**
        * @language zh_CN
        * 设置播放延时时间
        * @param value 时间 秒
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set delayTime(value: number) {
            if (this._delayTime != value) {
                this._change = true;
                this._delayTime = value * 1000.0;
                this._currentDelay = 0.0;
            }
        }

        /**
        * @language zh_CN
        * 获取是否循环播放
        * @returns boolean 是否循环
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get isLoop(): boolean {
            return this._isLoop;
        }

        /**
        * @language zh_CN
        * 设置是否循环播放
        * @param value 是否循环
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set isLoop(value: boolean) {
            if (this._isLoop != value) {
                this._change = true;
                this._isLoop = value;
            }
        }

        /**
        * @language zh_CN
        * 设置当前帧
        * @param value 0 - frameNum
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set currentFrame(value: number) {
            this._currentFrame = value;
        }

        /**
        * @language zh_CN
        * 获取当前帧
        * @param value currentFrame
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get currentFrame(): number {
            return this._currentFrame;
        }

        /**
        * @private
        * @language zh_CN
        * @param time
        * @param delay
        * @param usage
        * @param materialData
        * @param geometry
        * @param context3DProxy
        * @param modeltransform 
        * @param modeltransform
        * @param camera3D
        */
        public upload(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            usage["uvSpriteSheet"] = context3DProxy.getUniformLocation(usage.program3D, "uvSpriteSheet");
        }
        
        /**
        * @private
        */
        public activeState(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {

            if (this._change)
                this.caculate();

            if (this._start) {
                this._currentDelay += delay;

                if (this._currentDelay >= this._delayTime) {
                    this._time += delay;

                    if (this._time / this._speed > 1.0) {
                        if (this._currentFrame + 1 >= this._frameNum) {
                            if (this._isLoop) {
                                this._currentFrame = 0;
                            }
                            else {
                                this._start = false;
                            }
                        }
                        else {
                            this._currentFrame++;
                        }
                        this._time = 0;
                    }
                }
            }

            this._currentFrame = this._currentFrame % this._frameNum;

            this._uvSpriteSheet[0] = this.frameList[this._currentFrame].x;
            this._uvSpriteSheet[1] = this.frameList[this._currentFrame].y;
            this._uvSpriteSheet[2] = this.frameList[this._currentFrame].width;
            this._uvSpriteSheet[3] = this.frameList[this._currentFrame].height;
            context3DProxy.uniform1fv(usage["uvSpriteSheet"], this._uvSpriteSheet);
        }
    }
}
