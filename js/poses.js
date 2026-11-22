/* Flight path of the swift: one pose per section (L landscape, M portrait) */
/* poses: x,y in viewport fractions (-1..1), s = width relative to the smaller viewport side, degrees, colour.
   L = landscape, M = portrait. The bird keeps to a free lane so it never sits on running text. */
export var POSES=[
 {c:'#DAE666',L:{x:.5,y:.16,s:.42,roll:-10,yaw:28,pitch:10},   M:{x:.38,y:.42,s:.78,roll:-10,yaw:28,pitch:10}},   /* hero: acid on grey */
 {c:'#25281F',L:{x:-.74,y:-.04,s:.36,roll:-18,yaw:-30,pitch:6},M:{x:.78,y:-.72,s:.36,roll:-18,yaw:-30,pitch:6}},  /* idea: left lane / bottom right */
 {c:'#DAE666',L:{x:0,y:0,s:.7,roll:8,yaw:20,pitch:0},         M:{x:0,y:0,s:.9,roll:8,yaw:20,pitch:0}},         /* services: hidden behind the olive field */
 {c:'#25281F',L:{x:.7,y:.08,s:.44,roll:14,yaw:36,pitch:-8},   M:{x:.82,y:.92,s:.38,roll:14,yaw:36,pitch:-8}},   /* explore: right lane / top right */
 {c:'#25281F',L:{x:.8,y:.52,s:.36,roll:-8,yaw:-28,pitch:8},  M:{x:.62,y:1.02,s:.38,roll:-8,yaw:-28,pitch:8}},    /* work: top right above the pictures */
 {c:'#25281F',L:{x:-.74,y:0,s:.4,roll:-6,yaw:-24,pitch:8},   M:{x:.34,y:.94,s:.68,roll:-30,yaw:-28,pitch:8}}    /* contact: left lane / beside the headline; phone: same scale as the hero, above the text */
];
