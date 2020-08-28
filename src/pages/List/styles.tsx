import styled from 'styled-components';
import { shade } from 'polished'
export const Container = styled.div`
padding:0;
margin:0;

`;

export const Header = styled.div`

background: #006A6A;
height:60px;
display: flex;
justify-content:space-between;
align-items:center;
padding: 0 30px;
h1{
    color:white
}

img{
    width:80px;
    height:20px;
}
`;

export const Appname = styled.div`
display:flex;
color:white;

.todo{
    font: 30px Noto Sans JP, sans-serif;
    font-weight:bold;
    text-transform:uppercase;
}

.list{
    font: 30px Noto Sans JP, sans-serif;
    font-weight: 100;
    text-transform:uppercase;

}
`

export const Content = styled.div` 
background: #F5F5F5;
padding:10px 10px;
height:calc(100vh - 80px);
span{
    color:#006A6A;
    font: 16px Noto Sans JP, sans-serif;
    font-weight:bold;

}

`

export const Form = styled.form`

display:flex;
button{
    background:#36AFD1;
    transition: background-color 0.2s;
    span{
    color:white;
    }

    &:hover{
       background:${shade(0.2, '#36AFD1')}
   }
}
input{
   flex:1;
   border:0;
   padding:0 24px;
   border-radius: 5px 0 0 5px;


}
`;

export const ListArea = styled.div`
padding: 10px 0;

`;


export const BtnActionArea = styled.div`
display: flex;
svg{
       color:grey;
       margin: 0 10px;
    &:hover{
        cursor:pointer;
    }
}

`;

export const ListRowArea = styled.div`
max-height:12em;
overflow-y: scroll; 
overflow-x: hidden;


.MuiTableCell-alignCenter{
    width: 100%;
    text-align: left;
    .onlyRead{
        background: transparent;
        border:none;
    }
}


`;