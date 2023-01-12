import React, { useCallback, useEffect, useState } from 'react';
import { ContentWrapper } from '../ContentWrapper';
import { Input } from '../Input/Input';
import styles from './CreateGood.module.scss';
import axios from "../../axios";
import { Button } from '../Button';
import { ModalWindow } from '../ModalWindow/ModalWindow';
import { useDispatch, useSelector } from 'react-redux';
import { getMain } from '../../store/mainSlice';

export const CreateGood = ({setCreateGoodisOpen}) =>{
  const dispatch =useDispatch()
  const [category, setCategory] = useState("iPads");
  const [name, setName] = useState('ipad apple');
  const [articul, setArticul] = useState('23456');
  const [price, setPrice] = useState('20222');
	const [picture, setPicture] = useState(null);
	const [images, setImages] = useState([]);
	const [description, setDescription] = useState("qqqqqqqqqqqqqqq");
	const [response, setResponse] = useState(null);
	const [isOpen, setIsOpen] = useState(false);

  const {categories} = useSelector(state=>state.main)
	const createGood= async (goodData) => {
		const good = await axios.post("/admin/create-good", goodData);
		return good.data;
	};
useEffect(() => {
  dispatch(getMain)
}, []);

	const handleCreatePlane = useCallback(
		async (e) => {
			// e.preventDefault();
      console.log(category);
      // console.log(images, 'images');
			const formData = new FormData();
			formData.append("name", name);
			formData.append("articul", articul);
			formData.append("price", price);
			formData.append("category", category);
			formData.append("description", description);
      formData.append("picture", picture);
      images.forEach((file,i)=>{
        formData.append(`image-${i}`, file);
      })
			await createGood(formData)
			.then(res=>{
        if(!res.error){
          setResponse(res)
          setIsOpen(!isOpen);
        }
      })
          
		},
		[name,price,articul, category, description, picture,images],
	);

  return (
		<ContentWrapper className={styles.createGood}>
			<h1 className={styles.createGood__title}>Новий товар</h1>
			<form>
				<div className={styles.createGood__container}>
					<div className={styles.createGood__containerInputs}>
        <label>
							Категорія
							<select
								name="category"
								type="text"
                placeholder="Категорія"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
								// onInput={(e) => null}
							>
                {categories && Object.keys(categories).map(key=><option key= {key} value={categories[key]}>{categories[key]}</option> )}
                
              </select>
						</label>

						<label>
							Введіть назву{" "}
							<Input
								className={styles.createGood__input}
								name="name"
								type="text"
								placeholder="Назва товару"
								value={name}
								onChange={(e) => setName(e.target.value)}
								onInput={(e) => setName(e.target.value)}
							/>
						</label>
           <div className={styles.createGood__containerInside}>
              <label>
  							Артикул
  							<Input
  								name="articul"
  								type="text"
                  placeholder="Артикул товару"
  								value={articul}
  								onChange={(e) => setArticul(e.target.value)}
  								onInput={(e) => setArticul(e.target.value)}
  							/>
  						</label>
              <label>
  							Ціна
  							<Input
  								name="price"
  								type="number"
                  placeholder="Ціна товару"
  								value={price}
  								onChange={(e) => setPrice(e.target.value)}
  								onInput={(e) => setPrice(e.target.value)}
  							/>
  						</label>
           </div>
           
						<label>
							Виберіть основне зображення
							<input
								onChange={(e) => setPicture(e.target.files[0])}
								name="picture"
								type="file"
                multiple ={false}
							/>
						
						</label>
            <label>
							Виберіть додаткові зображення

							<input
								onChange={(e) => setImages([...e.target.files])}
								name="picture"
								type="file"
                multiple ={true}
                accept ="image/*"
							/>
							{/* <Input
								onChange={(e) => setImages(e.target.files)}
								name="picture"
								type="file"
                multiple ={true}
                accept ="image/*"
							/> */}
					
						</label>
           
           
					</div>
					{/* <img className={styles.createGood__img} src={null} alt="" /> */}
				</div>
			<label className={styles.createGood__description}> Опис
			  	<textarea
  					value={description}
  					name="description"
  					placeholder="Опис категорії"
  					onChange={(e) => setDescription(e.target.value)}
  				/>
			</label>
			</form>
			<Button  onClick={handleCreatePlane}>Створити товар</Button>
			{isOpen && (
				<div className={styles.createGood__modal}>
					<div className={styles.createGood__modalMessege}>
						<p>{response?.response}</p>
					</div>
					<Button onClick={()=>setCreateGoodisOpen(false)}>Back</Button>
				</div>
			)}
			{isOpen && <ModalWindow />}
		</ContentWrapper>
	)};

