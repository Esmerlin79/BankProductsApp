import { useState, useEffect, useContext } from 'react';

import _ from 'lodash';
import { parseISO, addYears } from 'date-fns';
import { StackNavigationProp } from '@react-navigation/stack';

import { useForm } from './useForm'; 
import { validateInputs } from '../utils';
import { Alert } from 'react-native';
import { Product } from '../interfaces';
import { ProductsContext } from '../context/ProductContext';
import { ProductsStackParams } from '../navigator/StackNavigator';


const useProductRegister = (
  initialProduct: Product | null = null, 
  navigation: StackNavigationProp<ProductsStackParams, "ProductRegisterScreen", undefined>
  ) => {
    
  const product = initialProduct;
  const { verifyProductId, createProduct, editProduct } = useContext(ProductsContext);

  const { form, setFormValue, onChange } = useForm({
    id: product ? product.id : '',
    name: product ? product.name : '',
    description: product ? product.description : '',
    logo: product ? product.logo : '',
    releaseDate: product ? product.date_release : new Date().toISOString(),
    reviewDate: product ? product.date_revision : addYears(new Date(), 1).toISOString(),
  });
  const { name, description, logo } = form;
  const [isLoading, setIsLoading] = useState(false);
  const [isProductIdValid, setIsProductIdValid] = useState<boolean>(false);
  const [isReleaseDateValid, setIsReleaseDateValid] = useState<boolean>(false);

  const handleReleaseChange = (value: string) => {
    const releaseDate = parseISO(value);
    const reviewDate = addYears(releaseDate, 1);
    setFormValue({ ...form, releaseDate: value, reviewDate: reviewDate.toISOString() });
  };

  const handleVerifyProductId = async (productId: string) => {
    try {
      if (product) return;
      if (validateInputs('ID', productId)) return setIsProductIdValid(true);
      const isValid = await verifyProductId(productId);
      setIsProductIdValid(isValid);
    } catch (error) {
      Alert.alert('Error', 'Hubo un error al validar el ID', [
        {
          text: 'Ok',
          onPress: () => {},
        },
      ]);
      return true;
    }
  };

  const handleCreateOrUpdateProduct = async () => {
    try {
     if(
         isProductIdValid
         || validateInputs('name', name)
         || validateInputs('description', description)
         || validateInputs('logo', logo)
         || isReleaseDateValid
     ) return;

     setIsLoading(true);

     if( product ) {
         await editProduct({
             ...form,
             date_release: form.releaseDate,
             date_revision: form.reviewDate
         })
         setIsLoading(false);
         navigation.navigate('ProductsScreen', {});
     } else {
         await createProduct({
             ...form,
             date_release: form.releaseDate,
             date_revision: form.reviewDate
         })
         setIsLoading(false);
         navigation.pop();
     }

    } catch (error) {
     setIsLoading(false);
     Alert.alert('Error', 'Hubo un error al crear el producto', [{ 
         text: 'Ok',
         onPress: () => {}
     }]);
    }
 }

  const debouncedHandleValidateId = _.debounce(handleVerifyProductId, 500);

  const clearForm = () => {
    setFormValue({
      id: product ? product.id : '',
      name: '',
      description: '',
      logo: '',
      releaseDate: '',
      reviewDate: '',
    });
  };

  useEffect(() => {
    debouncedHandleValidateId(form.id);
    return () => {
      debouncedHandleValidateId.cancel();
    };
  }, [form.id]);

  useEffect(() => {
    if (form.releaseDate) setIsReleaseDateValid(validateInputs('releaseDate', form.releaseDate));
  }, [form.releaseDate]);

  return {
    form,
    isLoading,
    isProductIdValid,
    isReleaseDateValid,
    handleReleaseChange,
    clearForm,
    onChange,
    debouncedHandleValidateId,
    handleCreateOrUpdateProduct,
  };
};

export default useProductRegister;