import './index.css'

const TranscationItem = props => {
  const {transactionDetails, itemdelete} = props
  const {mytitle, myamount, mytype, id} = transactionDetails
  const deletebutton = () => {
    itemdelete(id)
  }
  return (
    <li className="transactionitemcontainer">
      <div className="mycontainer">
        <p className="paddingtrans">{mytitle}</p>
        <p className="paddingtrans">Rs {myamount}</p>
        <p className="paddingtrans">{mytype}</p>
      </div>
      <button
        className="buttonele"
        type="button"
        onClick={deletebutton}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png "
          alt="delete"
          className="deleteicon"
        />
      </button>
    </li>
  )
}

export default TranscationItem
