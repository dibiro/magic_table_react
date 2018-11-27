import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './TableMagic.css'


function isBlank(str) {
  return (!str || /^\s*$/.test(str))
}

function searchFuction (text, keys, objectFilter) {
  if (text.length > 0 && !isBlank(text)) {
      let pass = 0
      keys.map(function(key){
        if (objectFilter[key.name]){
          if (String(objectFilter[key.name]).toLowerCase().indexOf(text.toLowerCase()) > -1){
            pass = pass + 1
          }
        }
      })
      return pass > 0
  } else {
    return false
  }
}

class TableMagic extends Component {
  constructor (props) {
    super(props)
    this.state = {
      search: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }
  handleInputChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }
  render() {
    const {name, classTable, classContainer, fixThead, fixFirstCol, isSearch, searchText} = this.props
    const {search} = this.state
    const {handleInputChange} = this
    var {keys, records, height} = this.props
    if (!isBlank(search)){
      let newList = []
      records.map(function(record){
        if(searchFuction(search, keys, record)){
          newList.push(record)
        }
      })
      records = newList
    }
    height = height ? height : '300px'
    return (
      <div className={'container-scroll ' + classContainer} style={{height}}>
        { isSearch &&
          <div className='search-box'>
            <input type="text" value={search} name='search' placeholder={searchText ? searchText : 'Search'} onChange={handleInputChange} />
          </div>
        }
        <table className={((fixThead || fixFirstCol) ? 'table-scroll ' : ' ') + classTable} border>
          <thead>
            <tr>
              <th colSpan={keys.length} > {name} </th>
            </tr>
            <tr>
            { keys && keys.map && keys.map((key, index) => 
                <th key={'keysTable'+index} className={fixFirstCol && index === 0 ? 'first-child ' : '' }>
                  {key.label && !isBlank(key.label) ? key.label : key.name }
                </th>
              )
            }
            </tr>
          </thead>
          <tbody>
            { records && records.map && records.map((record, index) =>
                <tr key={'record' + index}>
                  { keys && keys.map && keys.map((key, indexKey) => 
                      <th key={'keysRecordsTable' + indexKey + index}>
                        {record[key.name]}
                      </th>
                    )
                  }
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
}

TableMagic.propTypes = {
  fixThead: PropTypes.bool,
  fixFirstCol: PropTypes.bool,
  name: PropTypes.string,
  height: PropTypes.string,
  classContainer: PropTypes.string,
  classTable: PropTypes.string,
  records: PropTypes.array.isRequired,
  keys: PropTypes.array.isRequired,
};

export default TableMagic;
