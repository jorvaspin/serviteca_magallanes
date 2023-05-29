import * as React from 'react'

import image from '../../../../public/logo.png'
import './ConsumerToPrint.css'

export class ConsumerToPrint extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { checked: false }
    this.print = {
      nombre_cliente: 'Cliente',
      fecha_recepcion: '2021-08-01',
      kilometraje: 1000,
      marca: 'Toyota',
      mecanico: 'Mecanico',
      modelo: 'Corolla',
      patente: 'ABC123',
      trabajos_realizados: [
        {
          costo: 1000,
          nombre: 'Trabajo 1'
        },
        {
          costo: 2000,
          nombre: 'Trabajo 2'
        }
      ],
      total_a_pagar: 3000,
      uuid: '123456789'
    }
  }

  canvasEl

  componentDidMount () {
    // const ctx = this.canvasEl.getContext('2d')
    // if (ctx) {
    //   ctx.beginPath()
    //   ctx.arc(95, 50, 40, 0, 2 * Math.PI)
    //   ctx.stroke()
    //   ctx.fillStyle = 'rgb(200, 0, 0)'
    //   ctx.fillRect(85, 40, 20, 20)
    //   ctx.save()
    // }
  }

  handleCheckboxOnChange = () =>
    this.setState({ checked: !this.state.checked })

  setRef = (ref) => (this.canvasEl = ref)

  render () {
    const iva = 0.19
    let data = {}
    if (this.props.print) {
      data = this.props.print
    } else {
      data = this.print
    }
    console.log(data)
    // calculas el iva de los trabajos realizados
    const totalTrabajos = data.trabajos_realizados.reduce((acc, curr) => acc + curr.costo, 0)
    const totalTrabajosIva = totalTrabajos * iva
    return (
      <div className='relativeCSS'>
        <style type='text/css' media='print' />
        <table width='100%' border='0' cellpadding='0' cellspacing='0' align='center' className='fullTable' bgcolor='#fff'>
          <tr>
            <td height='20' />
          </tr>
          <tr>
            <td>
              <table width='600' border='0' cellpadding='0' cellspacing='0' align='center' className='fullTable' bgcolor='#ffffff'>
                <tr className='hiddenMobile'>
                  <td height='40' />
                </tr>
                <tr className='visibleMobile'>
                  <td height='30' />
                </tr>

                <tr>
                  <td>
                    <table width='480' border='0' cellpadding='0' cellspacing='0' align='center' className='fullPadding'>
                      <tbody>
                        <tr>
                          <td>
                            <table width='220' border='0' cellpadding='0' cellspacing='0' align='left' className='col'>
                              <tbody>
                                <tr>
                                  <td align='left'> <img src={image} width='65' height='65' alt='logo' border='0' /></td>
                                </tr>
                                <tr className='hiddenMobile'>
                                  <td height='40' />
                                </tr>
                                <tr className='visibleMobile'>
                                  <td height='20' />
                                </tr>
                                <tr>
                                  <td>
                                    Estimado, {data.nombre_cliente ? data.nombre_cliente : 'Cliente'}.
                                    <br /> Gracias por preferir nuestros servicios.
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table width='220' border='0' cellpadding='0' cellspacing='0' align='right' className='col'>
                              <tbody>
                                <tr className='visibleMobile'>
                                  <td height='20' />
                                </tr>
                                <tr>
                                  <td height='5' />
                                </tr>
                                <tr>
                                  <td>
                                    Orden de trabajo
                                  </td>
                                </tr>
                                <tr />
                                <tr className='hiddenMobile'>
                                  <td height='50' />
                                </tr>
                                <tr className='visibleMobile'>
                                  <td height='20' />
                                </tr>
                                <tr>
                                  <td>
                                    <small>#</small> {data.uuid}<br />
                                    <small>{data.fecha_recepcion}</small>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <table width='100%' border='0' cellpadding='0' cellspacing='0' align='center' className='fullTable' bgcolor='#fff'>
          <tbody>
            <tr>
              <td>
                <table width='600' border='0' cellpadding='0' cellspacing='0' align='center' className='fullTable' bgcolor='#ffffff'>
                  <tbody>
                    <tr />
                    <tr className='hiddenMobile'>
                      <td height='60' />
                    </tr>
                    <tr className='visibleMobile'>
                      <td height='40' />
                    </tr>
                    <tr>
                      <td>
                        <table width='480' border='0' cellpadding='0' cellspacing='0' align='center' className='fullPadding'>
                          <tbody>
                            <tr>
                              <th width='52%' align='left'>
                                Trabajo Realizado
                              </th>
                              {/* <th style={{ fontSize: '12px;', color: '#5b5b5b;', fontWeight: 'normal;', lineHeight: '1;', verticalAlign: 'top;', padding: '0 0 7px;' }} align='left'>
                                <small>SKU</small>
                              </th> */}
                              <th align='center'>
                                Cantidad
                              </th>
                              <th className='textRigth' align='right'>
                                Costo Servicio
                              </th>
                            </tr>
                            <tr>
                              <td height='1' colspan='4' />
                            </tr>
                            <tr>
                              <td height='10' colspan='4' />
                            </tr>
                            {
                              data.trabajos_realizados.map((trabajo, index) => {
                                return (
                                  <tr key={index}>
                                    <td className='article'>
                                      {trabajo.trabajo}
                                    </td>
                                    <td align='center'>1</td>
                                    <td align='right'>${trabajo.costo}</td>
                                  </tr>
                                )
                              }
                              )
                            }
                            <tr>
                              <td height='1' colspan='4' />
                            </tr>
                            <tr>
                              <td height='1' colspan='4' />
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td height='20' />
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>

        <table width='100%' border='0' cellpadding='0' cellspacing='0' align='center' className='fullTable' bgcolor='#fff'>
          <tbody>
            <tr>
              <td>
                <table width='600' border='0' cellpadding='0' cellspacing='0' align='center' className='fullTable' bgcolor='#ffffff'>
                  <tbody>
                    <tr>
                      <td>

                        <table width='480' border='0' cellpadding='0' cellspacing='0' align='center' className='fullPadding'>
                          <tbody>
                            <tr>
                              <td>
                                {data.forma_pago} {data.forma_pago === 'Debito/Credito' ? '(Contiene IVA)' : ''}
                              </td>
                              <td className='textRigth'>
                                {
                                  data.forma_pago === 'Debito/Credito' ? totalTrabajosIva : ''
                                }
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Total a pagar</strong>
                              </td>
                              <td className='textRigth'>
                                <strong>${data.total_a_pagar}</strong>
                              </td>
                            </tr>
                            <tr>
                              <td />
                              <td />
                            </tr>
                            <tr>
                              <td />
                              <td />
                            </tr>
                            <br />
                          </tbody>
                        </table>

                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>

        <table width='100%' border='0' cellpadding='0' cellspacing='0' align='center' className='fullTable' bgcolor='#fff'>

          <tr>
            <td>
              <table width='600' border='0' cellpadding='0' cellspacing='0' align='center' className='fullTable' bgcolor='#ffffff'>
                <tr>
                  <td>
                    <table width='480' border='0' cellpadding='0' cellspacing='0' align='center' className='fullPadding'>
                      <tbody>
                        <tr>
                          <td>
                            Avenida Santa Rosa 6791, La Granja, Santiago, Chile
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Serviteca Magallanes
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr className='spacer'>
                  <td height='50' />
                </tr>

              </table>
            </td>
          </tr>
          <tr>
            <td height='20' />
          </tr>
        </table>
      </div>
    )
  }
}

export class WrapperComponent extends React.Component {
  render () {
    console.log(this.props)
    return (
      <ConsumerToPrint print={this.props.print} />
    )
  }
}

export const FunctionalConsumerToPrint = React.forwardRef((props, ref) => {
  // eslint-disable-line max-len
  console.log(props)
  return <ConsumerToPrint {...props} ref={ref} />
})
