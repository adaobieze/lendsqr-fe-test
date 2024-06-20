'use client'

import React from 'react';
import { useFetchTestData } from '@/hooks/useTest'

export default function Login() {
  const { testData = [], isLoading: loadingData, isError:dataError } = useFetchTestData();

  console.log('test data:', testData)
  return (
    <div>Login</div>
  )
}
