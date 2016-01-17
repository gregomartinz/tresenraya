const Tablero = require('./Tablero.jsx');
const Cabecera = require('./Cabecera.jsx');
const JUGADORX = "jugador 1 - las X";
const JUGADOR0 = "jugador 2 - los 0";

const reinicio = {
  height: '50px',
  width: '300px',
};

var App = React.createClass({
  getInitialState: function(){
    return {
      turno: JUGADORX,
      valores: [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-']
      ],
      winner: 'n'
    };
  },

  checkBoard: function() {
            var t0 = this.state.valores[0];
            var t1 = this.state.valores[1];
            var t2 = this.state.valores[2];
            var check = function(a,b,c) {
              if(a == 'X' && b == 'X' && c == 'X')  return true

              if(a == '0' && b == '0' && c == '0')  return true              
              return false
            };
            //Comprobamos las filas
            if (check(t0[0], t0[1], t0[2])){
                console.log(t0[0])
             return t0[0];
           }
            if (check(t1[0], t1[1], t1[2])) return t1[0];
            if (check(t2[0], t2[1], t2[2])) return t2[0];
            //Comprobamos las columnas
            if (check(t0[0], t1[0], t2[0])) return t0[0];
            if (check(t0[1], t1[1], t2[1])) return t0[1];
            if (check(t0[2], t1[2], t2[2])) return t0[2];
            //Comprobamos las diagonales
            if (check(t0[0], t1[1], t2[2])) return t0[0];
            if (check(t0[2], t1[1], t2[0])) return t0[2];
            //Por defecto devolvemos n si no hay ganador
            return 'n';
    },

  appClick: function(numeroFila, numberoColumna){
    let valores = this.state.valores;
    let nuevoValor = this.state.turno === JUGADORX ? 'X':'0';
    valores[numeroFila][numberoColumna] = nuevoValor;
    this.setState({
      turno: this.state.turno === JUGADORX ? JUGADOR0:JUGADORX,
      valores: this.state.valores,
      winner :  this.checkBoard()
    });
  },

  resetGame: function() {
              this.setState(this.getInitialState());
  },

  render: function(){
    var texto;
    texto = "Turno del " + this.state.turno;
    if (this.state.winner == 'X') {
      window.alert("Gana jugador 1");
    }if (this.state.winner == '0') {
      window.alert("Gana jugador 2");
    }
    return (
      <div>
      <Cabecera texto={texto}/>
      <Tablero valores={this.state.valores}
      manejadorTableroClick={this.appClick}/>
      <button style={reinicio} onClick={this.resetGame}>
      Reiniciar
      </button>
      </div>
    )

  }
});
module.exports = App;
