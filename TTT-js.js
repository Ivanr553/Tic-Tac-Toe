var player = "";
var turn = "X";
var path = 0;
var x = [];
var o = [];

function reloaded() {
  for(var i = 1; i <= 9; i++){
    document.getElementById("tic-"+ i).style.color = "";
    document.getElementById("tic-"+ i).style.textShadow = "";
    document.getElementById("tic-"+ i).style.boxShadow = "";
    document.getElementById("tic-"+ i).style.cursor = "pointer";
    document.getElementById("tic-"+ i).innerHTML = "";
  }
  document.getElementById("inner-container").style.animation = "";
  document.getElementById("inner-container").style.opacity = "0";
  document.getElementById("startup-menu").style.display = "";
  player = "";
  turn = "X";
  path = 0;
  x = [];
  o = [];
  return console.log("reset");
}

function add(a) {
  if(a.innerHTML === "X" || a.innerHTML === "O") {
    return "Choose another tile";
  }
 else {
   if(check("X")[1].length > 0) {
       console.log("X Wins!");
       return reloaded();
     }
   if(check("O")[1].length > 0) {
        console.log("O Wins!");
       return reloaded();
     }
   a.style.cursor = "default";
   if(turn === "X"){
     if(a.id.length === 5) {
       x.push(a.id[4]*1);
     }
     a.style.color = "rgba(230, 0, 0, 0.9)";
     a.style.textShadow = "0px 0px 10px rgba(230, 0, 0, 0.9)";
     a.style.boxShadow = "0px 0px 25px rgba(230, 0, 0, 0.8)";
     a.innerHTML = "X";
     turn = "O";
     ai();
     if(x.length > 4) {
       console.log("Tie!");
       return reloaded();
     }
     return;
    }
    if(turn === "O"){
     if(a.id.length === 5) {
       o.push(a.id[4]*1);
     }
      a.style.color = "rgba(0, 0, 179, 0.7)";
      a.style.textShadow = "0px 0px 9px rgba(0, 0, 179, 1)";
      a.style.boxShadow = "0px 0px 25px rgba(0, 0, 179, 0.8)";
      a.innerHTML = "O";
      
      turn = "X";
      ai();
      if(o.length > 4) {
       console.log("Tie!");
       return reloaded();
     }
      return;
    }
 }
}

function choose(a) {
  document.getElementById("inner-container").style.animation = "fade 3s";
  document.getElementById("inner-container").style.opacity = "1";
  if(a.innerHTML === "O") {
    turn = "O";
    player = "O";
    document.getElementById("startup-menu").style.display = "none";
  }
  if(a.innerHTML === "X") {
    turn = "X";
    player = "X";
    document.getElementById("startup-menu").style.display = "none";
  }
}

function check(t) {
  var e = [];
  var c1 = [];
  var c2 = [];
  var c3 = [];
  var phrase = "";
  if(t === "X") {
    var c = [[1, 2, 3], [1, 5, 9], [1, 4, 7], [3, 5, 7], [3, 6, 9], [2, 5, 8], [4, 5, 6], [7, 8, 9]];
    e.splice(0);
    c2.splice(0);
    c3.splice(0);
    for(var i = x.length-1; i >= 0; i--) {
      for(var j = c.length-1; j >= 0; j--) {
        if(c[j].indexOf(x[i]) != -1) {
          e.push(c[j]);
          c.splice(j, 1);
        }
      }
    }
    if(e.length > 0) {
      for(var i = o.length-1; i >= 0; i--) {
        for(var j = e.length-1; j >= 0; j--) {
          if(e[j].indexOf(o[i]) != -1) {
            e.splice(j, 1);
          }
        }
      }
      if(e.length > 0) {
        for(var i = e.length-1; i >= 0; i--) {
            for(var k = x.length-1; k >=0; k--) {
              if(e[i].indexOf(x[k]) != -1) {
                c1.push(e[i]);
               for(var j = x.length-1; j >=0; j--) {
                 if(e[i].indexOf(x[j])!= -1 && x[k] != x[j]) {                   
                   for(var l = x.length-1; l >=0; l--) {
                     if(e[i].indexOf(x[l]) != -1 && x[k] != x[j] && x[l] != x[j] && x[k] != x[l]) {
                       c3.push(e[i]);
                     }
                     else {
                     if(l === 0) {
                       c2.push(e[i]);
                     }}
                   }
                   break;
                 }
               }
                break;
              }
            }
          e.splice(i, 1);
        }
      }
    }
  }
  if(t === "O") {
    var c = [[1, 2, 3], [1, 5, 9], [1, 4, 7], [3, 5, 7], [3, 6, 9], [2, 5, 8], [4, 5, 6], [7, 8, 9]];
    e.splice(0);
    c2.splice(0);
    c3.splice(0);
    for(var i = o.length-1; i >= 0; i--) {
      for(var j = c.length-1; j >= 0; j--) {
        if(c[j].indexOf(o[i]) != -1) {
          e.push(c[j]);
          c.splice(j, 1);
        }
      }
    }
    if(e.length > 0) {
      for(var i = x.length-1; i >= 0; i--) {
        for(var j = e.length-1; j >= 0 ; j--) {
          if(e[j].indexOf(x[i]) != -1) {
            e.splice(j, 1);
          }
        }
      }
      if(e.length > 0) {
        for(var i = e.length-1; i >= 0; i--) {
            for(var k = o.length-1; k >=0; k--) {
              if(e[i].indexOf(o[k]) != -1) {
                c1.push(e[i]);
               for(var j = o.length-1; j >=0; j--) {
                 if(e[i].indexOf(o[j])!= -1 && x[k] != x[j]) {
                   for(var l = o.length-1; l >=0; l--) {
                     if(e[i].indexOf(o[l]) != -1 && o[k] != o[j] && o[l] != o[j] && o[k] != o[l]) {
                       c3.push(e[i]);
                     }
                    else {
                     if(l === 0) {
                       c2.push(e[i]);
                     }}
                   }
                   break;
                 }
               }
                break;
              }
            }
          e.splice(i, 1);
        }
      }
    }
  }
  return [c2, c3, c1]
}

function ai() {
  if(player === "X") {
    if(check("O")[0].length > 0 && turn === "O") {
       add(document.getElementById("tic-"+check("O")[0][0][0]));
       add(document.getElementById("tic-"+check("O")[0][0][1]));
       add(document.getElementById("tic-"+check("O")[0][0][2]));
       return;
    }
    else {
    if(check("X")[0].length > 0 && turn === "O") {
      add(document.getElementById("tic-"+check("X")[0][0][0]));
        if(turn === "O"){
          add(document.getElementById("tic-"+check("X")[0][0][1]));
            if(turn === "O"){
              return add(document.getElementById("tic-"+check("X")[0][0][2]));
            }
          return;
        }
      return;
    }
    else {
    if(turn === "O" && check("O")[2].length === 1) {
      add(document.getElementById("tic-"+check("O")[2][0][0]));
      if(turn === "O"){
        add(document.getElementById("tic-"+check("O")[2][0][1]));
        if(turn === "O") {
          return add(document.getElementById("tic-"+check("O")[2][0][2]));
        }
      }
      return;
    }
    else {
    if(turn === "O" && check("X")[0].length === 0 && x.length > 3){
      add(document.getElementById("tic-1"));
      if(turn === "O") {
        add(document.getElementById("tic-2"));
          if(turn === "O") {
            add(document.getElementById("tic-3"));
              if(turn === "O") {
                add(document.getElementById("tic-4"));
                  if(turn === "O") {
                    add(document.getElementById("tic-5"));
                      if(turn === "O") {
                        add(document.getElementById("tic-6"));
                          if(turn === "O") {
                            add(document.getElementById("tic-7"));
                              if(turn === "O") {
                                add(document.getElementById("tic-8"));
                                  if(turn === "O") {
                                    add(document.getElementById("tic-9"));
                                  }
                              }
                          }
                      }
                  }
              }
          }
      }
      return;
    }
      else {
     if(x.length === 1 && turn === "O") {
      if(x.indexOf(2) > -1 || x.indexOf(4) > -1 || x.indexOf(6) > -1 || x.indexOf(8) > -1) {
        path = 1;
        return add(document.getElementById("tic-5"));
      }
      if(x.indexOf(1) > -1 || x.indexOf(3) > -1 || x.indexOf(7) > -1 || x.indexOf(9) > -1) {
        path = 2;
        return add(document.getElementById("tic-5"));
      }
      if(x.indexOf(5) >-1) {
        path = 3;
        return add(document.getElementById("tic-1"));
      }
    }
    if(x.length === 2 && turn === "O") {
      if(path === 1){
        if(x.indexOf(2) > -1 && x.indexOf(8) > -1) {
          path = 11;
          return add(document.getElementById("tic-4"));
        }
        if(x.indexOf(4) > -1 && x.indexOf(6) >-1) {
          path = 12;
          return add(document.getElementById("tic-2"));
        }
        if(x.indexOf(2) > -1 && x.indexOf(6) >-1) {
          return add(document.getElementById("tic-3"));
        }
        if(x.indexOf(2) > -1 && x.indexOf(4) >-1) {
          return add(document.getElementById("tic-1"));
        }
        if(x.indexOf(4) > -1 && x.indexOf(8) >-1) {
          return add(document.getElementById("tic-7"));
        }
         if(x.indexOf(6) > -1 && x.indexOf(8) >-1) {
          return add(document.getElementById("tic-9"));
        }
      }
      if(path === 2) {
        if(x.indexOf(6) > -1 || x.indexOf(8) > -1 || x.indexOf(4) > -1) {
          return add(document.getElementById("tic-2"));
        }
        if(x.indexOf(2) > -1) {
          return add(document.getElementById("tic-4"));
        }
        if(x.indexOf(1) > -1 && x.indexOf(9) > -1) {
          return add(document.getElementById("tic-4"));
        }
        if(x.indexOf(3) > -1 && x.indexOf(7) > -1) {
          return add(document.getElementById("tic-4"));
        }
      }
      if(path === 3) {
        if(x.indexOf(9) > -1) {
          return add(document.getElementById("tic-7"));
        }
      }
    }
    if(x.length === 3 && turn === "O") {
      console.log("here");
      if(path === 11) {
        if(x.indexOf(6) > -1) {
          return add(document.getElementById("tic-1"));
        }
      }
      if(path === 12) {
        if(x.indexOf(8) > -1) {
          return add(document.getElementById("tic-1"));
        }
      }
    }
    if(x.length === 4 && turn === "O") {
    }
  }
  }
  }
  }
  }
  else {
    if(check("X")[0].length > 0 && turn === "X") {
       add(document.getElementById("tic-"+check("X")[0][0][0]));
       add(document.getElementById("tic-"+check("X")[0][0][1]));
       add(document.getElementById("tic-"+check("X")[0][0][2]));
       return;
    }
    else {
    if(check("O")[0].length > 0 && turn === "X") {
      add(document.getElementById("tic-"+check("O")[0][0][0]));
        if(turn === "X"){
          add(document.getElementById("tic-"+check("O")[0][0][1]));
            if(turn === "X"){
              return add(document.getElementById("tic-"+check("O")[0][0][2]));
            }
          return;
        }
      return;
    }
    else {
    if(turn === "X" && check("X")[2].length === 1) {
      add(document.getElementById("tic-"+check("X")[2][0][0]));
      if(turn === "X"){
        add(document.getElementById("tic-"+check("X")[2][0][1]));
        if(turn === "X") {
          return add(document.getElementById("tic-"+check("X")[2][0][2]));
        }
      }
      return;
    }
    else {
    if(turn === "X" && check("O")[0].length === 0 && o.length > 3){
      add(document.getElementById("tic-1"));
      if(turn === "X") {
        add(document.getElementById("tic-2"));
          if(turn === "X") {
            add(document.getElementById("tic-3"));
              if(turn === "X") {
                add(document.getElementById("tic-4"));
                  if(turn === "X") {
                    add(document.getElementById("tic-5"));
                      if(turn === "X") {
                        add(document.getElementById("tic-6"));
                          if(turn === "X") {
                            add(document.getElementById("tic-7"));
                              if(turn === "X") {
                                add(document.getElementById("tic-8"));
                                  if(turn === "X") {
                                    add(document.getElementById("tic-9"));
                                  }
                              }
                          }
                      }
                  }
              }
          }
      }
      return;
    }
      else {
     if(o.length === 1 && turn === "X") {
      if(o.indexOf(2) > -1 || o.indexOf(4) > -1 || o.indexOf(6) > -1 || o.indexOf(8) > -1) {
        path = 1;
        return add(document.getElementById("tic-5"));
      }
      if(o.indexOf(1) > -1 || o.indexOf(3) > -1 || o.indexOf(7) > -1 || o.indexOf(9) > -1) {
        path = 2;
        return add(document.getElementById("tic-5"));
      }
      if(o.indexOf(5) >-1) {
        path = 3;
        return add(document.getElementById("tic-1"));
      }
    }
    if(o.length === 2 && turn === "X") {
      if(path === 1){
        if(o.indexOf(2) > -1 && o.indexOf(8) > -1) {
          path = 11;
          return add(document.getElementById("tic-4"));
        }
        if(o.indexOf(4) > -1 && o.indexOf(6) >-1) {
          path = 12;
          return add(document.getElementById("tic-2"));
        }
        if(o.indexOf(2) > -1 && o.indexOf(6) >-1) {
          return add(document.getElementById("tic-3"));
        }
        if(o.indexOf(2) > -1 && o.indexOf(4) >-1) {
          return add(document.getElementById("tic-1"));
        }
        if(o.indexOf(4) > -1 && o.indexOf(8) >-1) {
          return add(document.getElementById("tic-7"));
        }
         if(o.indexOf(6) > -1 && o.indexOf(8) >-1) {
          return add(document.getElementById("tic-9"));
        }
      }
      if(path === 2) {
        if(o.indexOf(6) > -1 || o.indexOf(8) > -1 || o.indexOf(4) > -1) {
          return add(document.getElementById("tic-2"));
        }
        if(o.indexOf(2) > -1) {
          return add(document.getElementById("tic-4"));
        }
        if(o.indexOf(1) > -1 && o.indexOf(9) > -1) {
          return add(document.getElementById("tic-4"));
        }
        if(o.indexOf(3) > -1 && o.indexOf(7) > -1) {
          return add(document.getElementById("tic-4"));
        }
      }
      if(path === 3) {
        if(o.indexOf(9) > -1) {
          path = 31;
          return add(document.getElementById("tic-7"));
        }
      }
    }
    if(o.length === 3 && turn === "X") {
      if(path === 11) {
        if(o.indexOf(6) > -1) {
          return add(document.getElementById("tic-1"));
        }
      }
      if(path === 12) {
        if(o.indexOf(8) > -1) {
          return add(document.getElementById("tic-1"));
        }
      }
    }
    if(o.length === 4 && turn === "X") {
    }
  }
  }
  }
  }
  }
}
