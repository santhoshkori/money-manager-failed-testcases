import {Component} from 'react'
import './index.css'
import {v4 as undId} from 'uuid'
import MyMoneyDetails from '../MoneyDetails'
import TranscationItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
    selected: 'selected',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
    selected: '',
  },
]
class MoneyManager extends Component {
  state = {
    balance: 0,
    income: 0,
    expenses: 0,
    title: '',
    amount: '',
    type: '',
    transactionList: [],
  }

  deletemyItem = id => {
    const {transactionList} = this.state
    console.log(id)
    const deleteditem = transactionList.filter(eachdele => eachdele.id === id)
    const deletedamount = deleteditem[0].myamount
    if (deleteditem[0].mytype === 'EXPENSES') {
      this.setState(prevState => ({
        balance: prevState.balance + parseInt(deletedamount),
        expenses: prevState.expenses - parseInt(deletedamount),
      }))

      const filteredList = transactionList.filter(
        eachdelete => eachdelete.id !== id,
      )
      this.setState({transactionList: filteredList})
    } else {
      this.setState(prevState => ({
        balance: prevState.balance - parseInt(deletedamount),
        income: prevState.income - parseInt(deletedamount),
      }))
      const filteredList = transactionList.filter(
        eachdelete => eachdelete.id !== id,
      )
      this.setState({transactionList: filteredList})
    }
  }

  Mytitle = event => {
    const titlevalue = event.target.value
    this.setState({title: titlevalue})
  }

  MyAmount = event => {
    const amountvalue = event.target.value
    this.setState({amount: amountvalue})
  }

  myOption = event => {
    const typevalue = event.target.value
    this.setState({type: typevalue})
  }

  MytransctionAmount = event => {
    event.preventDefault()
    const {title, amount, type} = this.state
    const newTransaction = {
      id: undId(),
      mytitle: title,
      myamount: amount,
      mytype: type,
    }
    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
    }))
    if (type === 'INCOME') {
      this.setState(prevState => ({
        balance: prevState.balance + parseInt(amount),
        income: prevState.income + parseInt(amount),
        title: '',
        amount: '',
        type: 'Income',
      }))
    } else if (type === 'EXPENSES') {
      this.setState(prevState => ({
        expenses: prevState.expenses + parseInt(amount),
        balance: prevState.balance - parseInt(amount),
        title: '',
        amount: '',
        type: 'Income',
      }))
    }
  }

  render() {
    const {
      balance,
      income,
      expenses,
      title,
      amount,

      transactionList,
    } = this.state

    const moneydetailsList = [
      {
        name: 'Your Balance',
        imgurl:
          'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
        Money: balance,
        alternate: 'balance',
        styling: 'balancestyling',
        testid: 'balanceAmount',
      },
      {
        name: 'Your Income',
        imgurl:
          'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
        Money: income,
        alternate: 'income',
        styling: 'incomestyling',
        testid: 'incomeAmount',
      },
      {
        name: 'Your Expenses',
        imgurl:
          'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
        Money: expenses,
        alternate: 'expenses',
        styling: 'expensesstyling',
        testid: 'expensesAmount',
      },
    ]
    return (
      <div className="bgcontainer">
        <div className="namecontainer">
          <h1>Hi,Richard</h1>
          <p>
            Welcome back to your{' '}
            <span className="managerspanele">Money Manager</span>
          </p>
        </div>
        <div className="moneycontainer">
          {moneydetailsList.map(eachdetail => (
            <MyMoneyDetails details={eachdetail} key={eachdetail.money} />
          ))}
        </div>
        <div className="inputANDtransactioncontainer">
          <form
            className="inputelecontainer"
            onSubmit={this.MytransctionAmount}
          >
            <h1>Add Transaction</h1>
            <label htmlFor="title">TITLE</label>
            <br />
            <input
              type="text"
              id="title"
              className="inputtitleele"
              placeholder="TITLE"
              onChange={this.Mytitle}
              value={title}
            />
            <br />
            <label htmlFor="amout">AMOUNT</label>
            <br />
            <input
              type="text"
              id="amout"
              className="inputtitleele"
              placeholder="AMOUT"
              onChange={this.MyAmount}
              value={amount}
            />
            <br />
            <label htmlFor="type">TYPE</label>
            <br />
            <select id="type" className="optionele" onChange={this.myOption}>
              {transactionTypeOptions.map(eachoption => (
                <option value={eachoption.optionId} key={eachoption.optionId}>
                  {eachoption.displayText}
                </option>
              ))}
            </select>
            <br />
            <button className="buttonsty" type="submit">
              Add
            </button>
          </form>
          <div className="transactionhistorycontainer">
            <h1>History</h1>
            <div className="transoptionscontainer">
              <p className="optionssty padding">TITLE</p>
              <p className="optionssty padding">AMOUNT</p>
              <p className="optionssty padding">TYPE</p>
            </div>
            <ul>
              {transactionList.map(eachtrans => (
                <TranscationItem
                  transactionDetails={eachtrans}
                  itemdelete={this.deletemyItem}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
