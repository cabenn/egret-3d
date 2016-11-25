﻿module egret3d {
    // 地型高度图的使用
    export class Class_TerrainLOD  extends Class_View3D {

        protected view1: View3D;
        protected ctl; LookAtController;
        protected plane: Mesh;
        protected lights: LightGroup = new LightGroup();
        protected matPlane: TextureMaterial;

        private terrainMethod: TerrainARGBMethod;


        protected textField: gui.UITextField;
        protected textFieldTotalFace: gui.UITextField;

        constructor() {
            super();



            this.view1 = new View3D(0, 0, window.innerWidth, window.innerHeight);
            this.view1.camera3D.lookAt(new Vector3D(0, 100, -100), new Vector3D(0, 0, 0));
            this.view1.backColor = 0xff000000;
            this._egret3DCanvas.addView3D(this.view1);
            this.ctl = new LookAtController(this.view1.camera3D, new Object3D());
            this.ctl.distance = 1000;
            this.view1.camera3D.far = 100000;

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            //this.view1.backImage = tex;

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);


            Input.addEventListener(KeyEvent3D.KEY_DOWN, this.onKeyDown, this);

            this._queueLoad = new QueueLoader();
            this._queueLoad.loadDefaultGUISkin();
            this._queueLoad.load("resource/terrain/ziyan_xinshou/Heightmap_0.jpg");
            this._queueLoad.load("resource/terrain/331.png");
            this._queueLoad.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadFonts, this);

        }
        protected onLoadFonts(e: LoaderEvent3D) {


            this.textField = new gui.UITextField();
            this.view1.addGUI(this.textField);
            this.textField.y = 20;
            this.textField.textColor = 0xff0000;

            this.textFieldTotalFace = new gui.UITextField();
            this.view1.addGUI(this.textFieldTotalFace);
            this.textFieldTotalFace.textColor = 0xff0000;


            this.matPlane = new TextureMaterial(this._queueLoad.getAsset("resource/terrain/331.png"));
            var heightImage = this._queueLoad.getAsset("resource/terrain/ziyan_xinshou/Heightmap_0.jpg");

            var mesh: Terrain = new Terrain(heightImage, 10240, 1000, 10240, 128, 128, true, this.matPlane);
            this.view1.addChild3D(mesh);
            this.terrain = mesh;

            this.textFieldTotalFace.text = "total face:" + (128 * 128 * 2).toString();
        }

        protected terrain: Terrain;
        protected onKeyDown(e: KeyEvent3D) {
            switch (e.keyCode) {
                case KeyCode.Key_1:
                    this.terrain.material.drawMode = DrawMode.LINES;
                    break;
                case KeyCode.Key_2:
                    this.terrain.material.drawMode = DrawMode.TRIANGLES;
                    break;
                case KeyCode.Key_3:
                    this.terrain.material.drawMode = DrawMode.POINTS;
                    break;
                case KeyCode.Key_4:
                    this.terrain.material.drawMode = DrawMode.LINE_STRIP;
                    break;
                case KeyCode.Key_5:
                    //this.terrain.wireframe.visible = !this.terrain.wireframe.visible;
                    break;
                //case KeyCode.Key_6:
                //    if (this.terrain.camera == this.camera) {
                //        this.terrain.camera = this.view1.camera3D;
                //    }
                //    else {
                //        this.terrain.camera = this.camera;
                //        this.camera.aspectRatio = this.view1.camera3D.aspectRatio;
                //        this.camera.fieldOfView = this.view1.camera3D.fieldOfView;
                //        this.camera.modelMatrix = this.view1.camera3D.modelMatrix;
                //    }
                //    break;
            }
        }

        public update(e: Event3D) {
            this.ctl.update();

            if (this.textField && this.terrain) {
                this.textField.text = "render face:" + this.terrain.geometry.faceCount.toString();
            }
        }
    }
}