/* eslint-disable no-undef */
/* eslint-disable camelcase */
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { useState, useEffect } from 'react'
import './CreateNewOT.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loading from 'react-fullscreen-loading'

export function CreateNewOT () {
  // importamos navigate para redireccionar
  const navigate = useNavigate()
  // importamos la url base de la api
  const url = import.meta.env.VITE_API_BASE_URL
  // inicializamos con el getOrderId
  useEffect(() => {
    getOrderId()
  }, [])

  function getToast () {
    toast.success('Orden de trabajo creada correctamente.', {
      position: toast.POSITION.TOP_RIGHT
    })
  }
  // funcion para crear la orden de trabajo desde el formulario
  const onSubmit = async (data) => {
    console.log(data)
    try {
      setLoading(true)
      const response = await axios.post(url + 'api/createWorkOrder', { data }, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      setLoading(false)
      console.log(response.data)
      getToast()
      navigate('/ordenes')
    } catch (error) {
      toast.warning('La sesión se ha cerrado, inicie sesión nuevamente.', {
        position: toast.POSITION.TOP_RIGHT
      })
      console.log(error)
      localStorage.clear()
      navigate('/login')
    }
  }

  // funcion para obtener la ultima uuid de la orden de trabajo
  const getOrderId = async () => {
    try {
      const response = await axios.get(url + 'api/getOrderId', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      setUuid(response.data.workOrderId)
      setMechanic(response.data.mechanic)
      setWorkshop(response.data.workshop)
    } catch (error) {
      localStorage.clear()
      navigate('/login')
    }
  }

  // inicializamos los estados
  const [id] = useState(0)
  const [codigo_ot] = useState(0)
  const [uuid, setUuid] = useState(0)
  const [patente] = useState('')
  const [marca] = useState('')
  const [modelo] = useState('')
  const [kilometraje] = useState()
  const [nombre_cliente] = useState('')
  const [mecanico] = useState('seleccione')
  const [forma_pago] = useState('seleccione')
  const [total_a_pagar, setTotal_a_pagar] = useState()
  const [loading, setLoading] = useState(false)

  // treamos la data de mecanicos y workshops
  const [mechanic, setMechanic] = useState([])
  const [workshop, setWorkshop] = useState([])

  // funcion para obtener el total a pagar
  function getTotal (cartValues) {
    let total = 0
    // sumamos los valores de costo
    for (const item of cartValues) {
      total = total + (Number.isNaN(item.costo) ? 0 : item.costo)
    }
    // formateamos el total a pagar a moneda chilena
    const chileanPeso = new Intl.NumberFormat('es-CL', { currency: 'CLP', style: 'currency' })
    // cobramos iva si paga con tarjeta
    if (watch('forma_pago') === 'Debito/Credito') {
      const iva = 0.19
      // eslint-disable-next-line camelcase
      const total_iva = total * iva
      // eslint-disable-next-line camelcase
      const total_mas_iva = total + total_iva
      return chileanPeso.format(total_mas_iva)
    }
    // retornamos el total a pagar
    return chileanPeso.format(total)
  }

  // funcion para obtener el total a pagar y renderizarlo
  function TotalAmout ({ control }) {
    const cartValues = useWatch({
      control,
      name: 'trabajos'
    })
    setTotal_a_pagar(getTotal(cartValues))
  }

  // inicializamos el useForm
  const {
    register,
    handleSubmit,
    watch,
    control
  } = useForm({
    defaultValues: {
      id,
      codigo_ot,
      patente,
      marca,
      modelo,
      kilometraje,
      nombre_cliente,
      mecanico,
      forma_pago,
      total_a_pagar,
      trabajos: [{ trabajo: '', costo: null }]
    }
  })

  // inicializamos el useFieldArray
  const { fields, append, remove } = useFieldArray({
    name: 'trabajos',
    control,
    rules: {
      required: 'Añade nuevos trabajos'
    }
  })

  return (
    <main className='form-new-ot'>
      {
        loading ? <Loading loading background='#0000008c' loaderColor='#fff' /> : null
      }
      <Form className='row' onSubmit={handleSubmit(onSubmit)}>
        <div className='p-1 mb-4 text-center'>
          <h2 className='mb-3'>Información Orden Trabajo</h2>
        </div>

        <Form.Group className='col-2 mb-3' controlId='formBasicID'>
          <Form.Label>#ID</Form.Label>
          <Form.Control disabled type='number' value={uuid + 1} {...register('id')} placeholder='id' />
        </Form.Group>

        <Form.Group className='col-2 mb-3' controlId='formBasicCodigo'>
          <Form.Label>Código</Form.Label>
          <Form.Control disabled type='number' value={uuid + 1} {...register('codigo_ot')} placeholder='Códito OT' />
        </Form.Group>

        <Form.Group className='col-4 mb-3' controlId='formBasicPatente'>
          <Form.Label>Patente</Form.Label>
          <Form.Control type='text' {...register('patente')} placeholder='Ingrese la patente' />
          <Form.Text className='text-muted'>
            *Campo importante
          </Form.Text>
        </Form.Group>

        <Form.Group className='col-4 mb-3' controlId='formBasicCliente'>
          <Form.Label>Nombre Cliente</Form.Label>
          <Form.Control type='text' {...register('nombre_cliente')} placeholder='Ingrese nombre cliente' />
          <Form.Text className='text-muted'>
            *Campo importante
          </Form.Text>
        </Form.Group>

        <Form.Group className='col-4 mb-3' controlId='formBasicMarca'>
          <Form.Label>Marca</Form.Label>
          <Form.Control type='text' {...register('marca')} placeholder='Ingrese la marca' />
          <Form.Text className='text-muted'>
            *Campo importante
          </Form.Text>
        </Form.Group>

        <Form.Group className='col-4 mb-3' controlId='formBasicModelo'>
          <Form.Label>Modelo</Form.Label>
          <Form.Control type='text' {...register('modelo')} placeholder='Ingrese el modelo' />
          <Form.Text className='text-muted'>
            *Campo importante
          </Form.Text>
        </Form.Group>

        <Form.Group className='col-4 mb-3' controlId='formBasicKilometraje'>
          <Form.Label>Kilometraje</Form.Label>
          <Form.Control type='number' {...register('kilometraje')} placeholder='Ingrese el kilometraje' />
          <Form.Text className='text-muted'>
            *Campo Opcional
          </Form.Text>
        </Form.Group>

        <Form.Group className='col-4 mb-3' controlId='formBasicMecanico'>
          <Form.Label>Mécanico</Form.Label>
          <Form.Select {...register('mecanico')}>
            <option value='seleccione'>Seleccione mecanico</option>

            {
              mechanic.map((mecha) => (
                <option key={mecha.id} value={mecha.id}>{mecha.name}</option>
              ))
            }

          </Form.Select>
          <Form.Text className='text-muted' />
        </Form.Group>

        <Form.Group className='col-4 mb-3' controlId='formBasicMecanico'>
          <Form.Label>Taller</Form.Label>
          <Form.Select {...register('taller')}>
            <option value='seleccione'>Seleccione el taller</option>

            {
              workshop.map((work) => (
                <option key={work.id} value={work.id}>{work.name}</option>
              ))
            }

          </Form.Select>
          <Form.Text className='text-muted' />
        </Form.Group>

        <Form.Group className='col-4 mb-3' controlId='formBasicFormaPago'>
          <Form.Label>Forma de pago</Form.Label>
          <Form.Select {...register('forma_pago')}>
            <option value='seleccione'>Seleccione forma de pago</option>
            <option value='Debito/Credito'>Debito/Credito</option>
            <option value='transferencia'>Transferencia</option>
            <option value='efectivo'>Efectivo</option>
          </Form.Select>
          <Form.Text className='text-muted'>
            *Campo Opcional
          </Form.Text>
        </Form.Group>

        <hr className='mt-5 mb-5' />
        <Form.Group className='col-12 mb-3' controlId='formBasic'>
          <main className='row'>
            {fields.map((field, index) => {
              return (
                <section key={index}>
                  <div className='row mb-3'>
                    <Form.Group className='col-6 mb-3'>
                      <Form.Label>Trabajo</Form.Label>
                      <Form.Control type='text' {...register(`trabajos.${index}.trabajo`, { required: true })} placeholder='Ingrese el trabajo realizado' />
                      <Form.Text className='text-muted'>
                        *Campo Opcional
                      </Form.Text>
                    </Form.Group>
                    <Form.Group className='col-4 mb-3'>
                      <Form.Label>Costo trabajo</Form.Label>
                      <Form.Control type='number' {...register(`trabajos.${index}.costo`, { valueAsNumber: true })} placeholder='Ingrese el valor del trabajo' />
                      <Form.Text className='text-muted'>
                        *Campo Opcional
                      </Form.Text>
                    </Form.Group>
                    <div className='col-2 just-center mb-2'>
                      <Button className='offset-0' onClick={() => remove(index)}>Remover</Button>
                    </div>

                  </div>

                </section>
              )
            })}
            <div className='row m-0'>
              <Button
                className='col-2 offset-0' onClick={() => {
                  append({
                    trabajo: '',
                    costo: 0
                  })
                }}
              >Añadir Trabajo
              </Button>
            </div>

            <TotalAmout control={control} />

          </main>
        </Form.Group>
        <Form.Group className='col-7 mb-3' controlId='formBasic' />
        <Form.Group className='col-4 mb-3' controlId='formBasicTotalAPagar'>
          <Form.Label>Total a pagar</Form.Label>
          <Form.Control type='text' disabled value={total_a_pagar} placeholder='Ingrese el total' />
          <Form.Text className='text-muted' />
        </Form.Group>
        <Form.Group className='col-1 mb-3' controlId='formBasic' />
        <hr className='mt-5 mb-5' />

        <Button className='col-4 offset-8' variant='primary' type='submit'>
          Crear Orden de trabajo
        </Button>
      </Form>
    </main>
  )
}
