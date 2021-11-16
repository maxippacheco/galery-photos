import React, { useEffect } from 'react'
import styled, { keyframes } from 'styled-components';
import { useForm } from './hooks/useForm';
import { usePhotos } from './hooks/usePhotos';


const GaleryApp = () => {

	const [queryValue, handleInputChange, reset] = useForm({
		query: ''
	});

	const { query } = queryValue;

	const { getPhotos, photos, setPhotos } = usePhotos();

	useEffect(() => {
	
		getPhotos();		
	
	}, []);


	if (!photos.results) {
		return(
			<LoaderContainer>
				<Loader>A</Loader>
			</LoaderContainer>
		)
	}
	
	const onSearch = (e) => {
		e.preventDefault();
		getPhotos(query);
	}

	return (
		<Container>
			<NavbarContainer>
				<CustomForm onSubmit={ onSearch }>
					<CustomInput 
						type='text'
						name='query'
						value={query}
						onChange={handleInputChange}
					/>
				</CustomForm>
			</NavbarContainer>
			
			<GridContainer>
			 {
				photos.results.map(photo => {
					return(
						<div style={{ backgroundColor: '#eceaea'}} key={photo.id}>
							<CustomImage src={photo.urls.regular} alt="photo" />
							<Paragraph>{photo.alt_description}</Paragraph>
						</div>
						
					)
				})
			 }
			</GridContainer>
		</Container>
	)
}

export default GaleryApp;


const Container = styled.div`
	height: 100vh;
	width: 99.1vw;
`;

const NavbarContainer = styled.nav`
	width: 100%;
	height: 8%;
	background-color: white;
	box-shadow: 0px 4px 2px #c2c2c2;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const CustomForm = styled.form`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const CustomInput = styled.input`
	width: 15%;
	padding: 10px 6px;
	border: 1px solid #c2c2c2;
	border-radius: 4px;
	color: #444;

	&:focus{
		outline: none;
	}
`;

const GridContainer = styled.div`
	width: 100%;
	height: auto;
	display: grid;
	grid-template-columns: repeat(3, 300px);
	justify-content: center;
	align-items: center;
	gap: 20px;
	padding-top: 60px;
	padding-bottom: 20px;
`;

const CustomImage = styled.img`
	width: 300px;
	margin: 0;
	/* height: 200px; */
	object-fit: cover;
`;

const Paragraph = styled.p`
	border: none;
	background-color: #eceaea;
	padding: 8px 10px;
`;

const LoaderContainer = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	color: transparent;
`;

const spin = keyframes`
	0%{
		transform: rotate(0deg);
	}
	100%{
		transform: rotate(360deg);
	}
`;

const Loader = styled.div`
	border: 4px solid #ccc;
	border-radius: 999px;
	width: 200px;
	height: 200px;
	animation: ${spin} 1s linear infinite;
	border-left-color: transparent;
`;

