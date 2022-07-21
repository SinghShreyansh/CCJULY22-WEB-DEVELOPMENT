import './Home.css'
import Product from './Product'
import axios from './axios';
import React,{useEffect,useState} from 'react'


function Home() {
    const[prodArr,setProdArr]= useState([]);

    useEffect(() => {
         axios.get('/account/getproducts').then((data)=>{
            if(data.type==="success"){
                alert("Successfully")
            }
            setProdArr(data.data.msg);
        }).catch((err)=>{
            alert(" Some Error Ocurred!"+err)
        })
    },[]);
    return (
        <div className="home">
            <div className="home__container">
                <img src="https://m.media-amazon.com/images/I/71MwDPWV9XL._SX3000_.jpg" alt="" className="home__image">
                </img>
            </div>

            <div className="home__row">
             { prodArr.length &&
               prodArr.map((data,index)=>{
                if(index>1) return;
               return <Product id={data._id} title={data.title} rating={data.rating} image={data.image} price={data.price} />
               })

            }
            </div>


            <div className="home__row">
            { prodArr.length &&
               prodArr.map((data,index)=>{
                if(index<2||index>4) return;
               return <Product id={data._id} title={data.title} rating={data.rating} image={data.image} price={data.price} />
               })

            }
            </div>
            <div>
            { prodArr.length &&
               prodArr.map((data,index)=>{
                if(index!==5) return;
               return <Product id={data._id} title={data.title} rating={data.rating} image={data.image} price={data.price} />
               })
            }
        </div>
         <div className="home__row">
         { prodArr.length &&
           prodArr.map((data,index)=>{
            if(index<6) return;
           return <Product id={data._id} title={data.title} rating={data.rating} image={data.image} price={data.price} />
           })

          }

        </div>
        </div>
    )
}

export default Home
