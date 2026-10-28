import React, { PureComponent } from 'react'
import './Table.css'

export class Table extends PureComponent {
  render() {
    return (
      <div className="table-responsive">
        <table className="tabla">
                <thead className="thead-dark">
                    <tr className='tr'>
                        <th scope="col">Id</th>
                        <th scope="col">Avatar</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Creado el</th>
                        <th scope="col" className="estado-col">Estado</th>
                        <th scope="col" className="acciones-col">Acciones</th>
                    </tr>
                </thead>
                {this.props.children}

            </table>
      </div>
    )
  }
}

export default Table
