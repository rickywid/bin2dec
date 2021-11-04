import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import {
  Container,
  FormControl,
  FormHelperText,
  Button,
  Input,
  Heading
} from "@chakra-ui/react"
import calculate from './utils/calculate';

function App() {
  const [decimalVal, setDecimalValue] = useState(0);
  const [values, setValues] = useState<number[]>([]);
  const [errors, setErrors] = useState<string>("");
  const [inputVal, setInputVal] = useState<string>("");
  const formRef = useRef<any>();

  useEffect(() => {
    setDecimalValue(values.reduce((sum, value) => sum + value, 0));
  }, [values]);

  const validate = () => {
    const regex = /^[0-1]*$/gm.test(inputVal);
    if (inputVal.length > 8) { throw 'max 8 values' }
    if (!regex) { throw 'only 0s and 1s' }
  }

  const handleSubmit = (e: any) => {
    try {
      e.preventDefault();
      formRef.current.reset();
      setErrors("");
      validate();
      setValues(calculate(inputVal));
    } catch (e: any) {
      setErrors(e);
      setInputVal("");
      setValues([]);
    }
  }

  const displayBinaryValues = () => {
    return values.join(" + ");
  }

  return (
    <Container maxW="container.xl">
      <Heading as="h1">BIN2DEC</Heading>
      <form role="form" ref={formRef} onSubmit={handleSubmit}>
        <FormControl id="first-name" isRequired>
          <Input role="input" placeholder="Enter binary values" onChange={(e) => setInputVal(e.target.value)} />
          <FormHelperText>Example: 11100000 = 7</FormHelperText>
          <Button role="button" type="submit" variantColor="teal" variant="outline" width="full" mt={4}>
            Enter
          </Button>
        </FormControl>
      </form>
      {errors ? <small data-testid="error">{errors && errors}</small> :
        <>
          <p data-testid="input values">{inputVal && inputVal.split("").join(' ')}</p>
          <p>{displayBinaryValues()}</p> = <span data-testid="conversion">{decimalVal}</span>
        </>}
    </Container>
  );
}

export default App;
