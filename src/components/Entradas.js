import React, {useState, useEffect} from 'react';
import primes from '../primes.json';


function Entradas(){

    const [estado, setEstado] = useState({
        error:false,
        message_error:''
    });
    const [datos , setDatos] = useState({
        entrada:''
    });

    const [resultados, setResultados] = useState({
        fibonacci:-1,
        triangular:-1,
        primo:-1

    });
    
    const handleInputChange = (event) => {

        setEstado({error:false, message_error:''});
        setDatos({
            ...datos,
            [event.target.name]:event.target.value
        })        
    }
    
    const getPrime =  (indice) =>{
        --indice;
        return primes[indice];
    }

    const fibonacci =  (nterm) =>{

        let n1 = 0;
        let n2 = 1;
        let contador = 0;
        let serie = []
        

        if (nterm <= 0){
            return -1;

        }else if(nterm === 1){
            return n1;
            
        }else{
            
            while (contador < nterm){
                serie.push(n1)
                let nth = n1 + n2;
                n1 = n2;
                n2 = nth;   
                contador += 1;
                
            }
            return serie[serie.length-1]

        }
        
    
    }

    const getTriangular =  (n) =>{
        return (n*(n+1))/2
    }
    
    

    const test =  () =>{

        let nterm = parseInt(datos.entrada);
        if (isNaN(nterm)) {
            setEstado({error:true, message_error:'Ingrese un n\u00FAmero natural'});
            return;
        }
        setResultados({fibonacci:fibonacci(nterm), triangular:getTriangular(nterm-1), primo:getPrime(nterm+2)});
        
        
    
    }
    const Limpiar =  () =>{        
        setDatos({entrada:''});
        setResultados({fibonacci:-1, triangular:-1, primo:-1});
        setEstado({error:false, message_error:''});
    
    
    }

    
    useEffect(() => {
        
    },[]);

    return (
      <div className="">

        <div className = "label-form" >
            Introduzca un n&uacute;mero natural
        </div>
        <input className = "form-control" type = "text"  placeholder = "Introduzca un n&uacute;mero natural" value = {datos.entrada} name = "entrada" onChange = {handleInputChange} />


        {estado.error === true &&
            <div className = "alert alert-danger" role="alert" >
                {estado.message_error}
            </div>
        }
        <button type="button" className="btn btn-success" onClick = {() => test()}>Calcular</button>&nbsp;&nbsp;&nbsp;
        <button type="button" className="btn btn-secondary" onClick = {() => Limpiar()}>Limpiar</button>
        <br/>
        <br/>
        <div className = "label-form" > S(n) = ( 5Fibonacci(n) - 3Triangular(n-1) ) / 2Primo(n+2)</div>
        <br/>

            <div className = "label-form" > S(n) = ( 5 *
                {resultados.fibonacci === -1 &&
                    "Fibonacci(n)"
                }
                {resultados.fibonacci !== -1 &&
                    resultados.fibonacci
                }
                - 3 *
                {resultados.triangular === -1 &&
                    "Triangular(n-1)"
                }
                {resultados.triangular !== -1 &&
                    resultados.triangular
                }
                ) / 2
                {resultados.primo === -1 &&
                    "Primo(n+2)"
                }
                {resultados.primo !== -1 &&
                    '*' + resultados.primo
                }
            
            </div>
            <div className = "label-form" >
            {resultados.fibonacci !== -1 && resultados.triangular !== -1 && resultados.primo !== -1 &&
                'S(n) = '+(5*resultados.fibonacci - 3*resultados.triangular)+' / '+2*resultados.primo
            }
            </div>

            {resultados.fibonacci !== -1 && resultados.triangular !== -1 && resultados.primo !== -1 &&            
                <>
                <div className="label-form">
                    Resultado
                </div><input className="form-control" type="text" value={((5*resultados.fibonacci) - (3*resultados.triangular)) / (2*resultados.primo)} placeholder="Resultado" disabled />
                </>
            }
    
      </div>
      
    );
    
}
export default Entradas;