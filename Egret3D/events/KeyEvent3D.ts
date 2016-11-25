﻿module egret3d {

    /**
     * @language zh_CN
     * 按键码
     * @version Egret 3.0
     * @platform Web,Native
     */
    export enum KeyCode {
        Key_BackSpace = 8,
        Key_Tab = 9,
        Key_Clear = 12,
        Key_Enter = 13,
        Key_Shift_L = 16,
        Key_Control_L = 17,
        Key_Alt_L = 18,
        Key_Pause = 19,
        Key_CapsLock = 20,
        Key_Escape = 21,
        Key_Space = 32,
        Key_Prior = 33,
        Key_Next = 34,
        Key_End = 35,
        Key_Home = 36,
        Key_Left = 37,
        Key_Up = 38,
        Key_Right = 39,
        Key_Down = 40,
        Key_Select = 41,
        Key_Print = 42,
        Key_Execute = 43,
        Key_Insert = 45,
        Key_Delete = 46,
        Key_Help = 47,
        Key_0 = 48,
        Key_1 = 49,
        Key_2 = 50,
        Key_3 = 51,
        Key_4 = 52,
        Key_5 = 53,
        Key_6 = 54,
        Key_7 = 55,
        Key_8 = 56,
        Key_9 = 57,

        Key_A = 65,
        Key_B = 66,
        Key_C = 67,
        Key_D = 68,
        Key_E = 69,
        Key_F = 70,
        Key_G = 71,
        Key_H = 72,
        Key_I = 73,
        Key_J = 74,
        Key_K = 75,
        Key_L = 76,
        Key_M = 77,
        Key_N = 78,
        Key_O = 79,
        Key_P = 80,
        Key_Q = 81,
        Key_R = 82,
        Key_S = 83,
        Key_T = 84,
        Key_U = 85,
        Key_V = 86,
        Key_W = 87,
        Key_X = 88,
        Key_Y = 89,
        Key_Z = 90,
        Key_KP_0 = 96,
        Key_KP_1 = 97,
        Key_KP_2 = 98,
        Key_KP_3 = 99,
        Key_KP_4 = 100,
        Key_KP_5 = 101,
        Key_KP_6 = 102,
        Key_KP_7 = 103,
        Key_KP_8 = 104,
        Key_KP_9 = 105,
        Key_Multiply = 106,
        Key_Add = 107,
        Key_Separator = 108,
        Key_Subtract = 109,
        Key_Decimal = 110,
        Key_Divide = 111,
        Key_F1 = 112,
        Key_F2 = 113,
        Key_F3 = 114,
        Key_F4 = 115,
        Key_F5 = 116,
        Key_F6 = 117,
        Key_F7 = 118,
        Key_F8 = 119,
        Key_F9 = 120,
        Key_F10 = 121,
        Key_F11 = 122,
        Key_F12 = 123,
        Key_F13 = 124,
        Key_F14 = 125,
        Key_F15 = 126,
        Key_F16 = 127,
        Key_F17 = 128,
        Key_F18 = 129,
        Key_F19 = 130,
        Key_F20 = 131,
        Key_F21 = 132,
        Key_F22 = 133,
        Key_F23 = 134,
        Key_F24 = 135,

        Key_Num_Lock = 136,
        Key_Scroll_Lock = 137,
    }

    /**
    * @language zh_CN
    * @class egret3d.MouseEvent3D
    * @classdesc
    * KeyEvent3D 按键事件，
    * 只有Input.addEventListener 才会产生下类事件
    * @includeExample events/KeyEvent3D.ts
    * @see egret3d.Event3D
    * @see egret3d.EventDispatcher
    * @see egret3d.Input
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class KeyEvent3D extends Event3D {

        ///**
        //* @language zh_CN
        //* KEY_CLICK 常量定义 按键点击事件标识。
        //* 可注册对象 : Input类型。
        //* 事件响应状态 : 按键每次点击响应，按下回弹为一次点击。
        //* 响应事件参数 : KeyEvent3D类型,其中KeyEvent3D.keyCode的内容即为Key的值。
        //* @see egret3d.Input
        //* @default "onKeyClick"
        //* @version Egret 3.0
        //* @platform Web,Native
        //*/
        //public static KEY_CLICK: string = "onKeyClick";

        /**
        * @language zh_CN
        * KEY_DOWN 常量定义  按键按下事件标识。
        * 可注册对象 : Input类型。
        * 事件响应状态 : 按键每次按下时响应。
        * 响应事件参数 : KeyEvent3D类型,其中KeyEvent3D.keyCode的内容即为Key的值。
        * @see egret3d.Input
        * @default "onKeyDown"
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static KEY_DOWN: string = "onKeyDown";

        /**
        * @language zh_CN
        * KEY_UP 常量定义 按键回弹事件标识。
        * 可注册对象 : Input类型。
        * 事件响应状态 : 按键每次回弹时响应。
        * 响应事件参数 : KeyEvent3D类型,其中KeyEvent3D.keyCode的内容即为Key的值。
        * @see egret3d.Input
        * @default "onKeyUp"
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static KEY_UP: string = "onKeyUp";

        
        /**
        * @language zh_CN
        * 按键code值,枚举类型可以参考egret3d.KeyCode
        * @see egret3d.KeyCode
        * @default 0
        * @version Egret 3.0
        * @platform Web,Native
        */
        public keyCode: number = 0;
    }
}