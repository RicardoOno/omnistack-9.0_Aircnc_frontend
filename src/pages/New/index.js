import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import camera from '../../assets/camera.svg';

import './styles.css';

export default function New({history}){
    const [company, setCompany] = useState('');
    const [price, setPrice] = useState('');
    const [techs, setTechs] = useState('');
    const [thumbnail, setThumbnail] = useState(null)

    const preview = useMemo(
        () => {
            return thumbnail ? URL.createObjectURL(thumbnail) : null
        },
        [thumbnail]
    );

    async function handleSubmit(event){
        event.preventDefault();
        
        const data = new FormData();
        const user = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('price', price);
        data.append('company', company);
        data.append('techs', techs);

         await api.post('/spots', data, {
             headers: { user }
        });

        history.push('/dashboard');

    }
    
    return(
        <>
        <form onSubmit={handleSubmit}>
            <label 
             id="thumbnail" 
             style={{ backgroundImage: `url(${preview})` }}
             className={thumbnail ? 'hasThumbnail' : ''}
            >
                <input type="file" onChange={ event => setThumbnail(event.target.files[0]) }/>
                <img src={camera} alt="camera" />
            </label>

            <label htmlFor="company">Empres *</label>
            <input
             id="company"
             placeholder="Nome da empresa"
             value={company}
             onChange={event => setCompany(event.target.value)}
            />
            <label htmlFor="techs">Tecnologias * <span>(separadas por virgula)</span></label>
            <input
             id="techs"
             placeholder="Tecnoligias utilizadas"
             value={techs}
             onChange={event => setTechs(event.target.value)}
            />
            <label htmlFor="price">Preço da diaria * <span>(em branco para gratuito)</span></label>
            <input
             id="price"
             placeholder="Valor por dia"
             value={price}
             onChange={event => setPrice(event.target.value)}
            />
            <button className="btn">Cadastrar</button>
        </form>
        </>
    )
}