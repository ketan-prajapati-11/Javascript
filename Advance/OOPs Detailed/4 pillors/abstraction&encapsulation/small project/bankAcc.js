class BankAccount {
  #balance;
  #pin;
  #failedAttempts = 0;
  #isLocked = false;
  #transationHistory = [];
  constructor(accountHolderName, accountNumber, pin, balance = 0) {
    this.accountHolderName = accountHolderName;
    this.accountNumber = accountNumber;
    this.#balance = balance;
    this.#pin = pin;
  }
  #lockAccount() {
    console.log(
      "You reached wronge pin attempt entered, your Account is Locked ",
    );
    return true;
  }
  #recordTransaction(type, amount) {
    let date = new Date();
    this.#transationHistory.push({
      date: date.toLocaleDateString("en-IN"),
      time: date.toLocaleTimeString(),
      type: "DEPOSITE",
      amount: amount,
      balanceAfter: this.#balance,
    });
  }
  deposite(amount) {
    if (amount <= 0) {
      console.log("Please Enter amount more than 0");
      return false;
    } else {
      this.#balance += amount;
      console.log(`${amount} successfully Deposite`);
      this.#recordTransaction("Deposit", amount);
      return true;
    }
  }

  withdraw(amount, pin) {
    if (this.#failedAttempts === 3) {
      this.#isLocked = true;
      this.#lockAccount();
      return true;
    } else {
      if (pin !== this.#pin) {
        this.#failedAttempts++;
        console.log(
          `Entered PIN is wrong!!! Enter corect pin youhave left: ${3 - this.#failedAttempts} attempts`,
        );
        return false;
      } else if (amount <= 0) {
        this.#failedAttempts === 0;
        console.log("Entered Withdraw amount more than 0");

        return false;
      } else if (amount > this.#balance) {
        this.#failedAttempts === 0;
        console.log("Not sufficent Balance to Widhraw that amount");
        return false;
      } else {
        this.#failedAttempts === 0;
        console.log(`${amount} sucessfully Withdrawed, collect it`);
        this.#balance -= amount;

        this.#recordTransaction("Withdraw", amount);

        return true;
      }
    }
  }

  checkBalance(pin) {
    if (this.#failedAttempts === 3) {
      this.#isLocked = true;
      this.#lockAccount();
      return true;
    } else {
      if (this.#pin !== pin) {
        this.#failedAttempts++;
        console.log(
          `Entered PIN is wrong!!! Enter corect pin youhave left: ${3 - this.#failedAttempts} attempts`,
        );
        return false;
      } else {
        this.#failedAttempts === 0;
        console.log(`${this.accountHolderName} balance is: ${this.#balance}`);
        return true;
      }
    }
  }
  getStatement(pin) {
    if (this.#pin !== pin) {
      console.log("Wrong PIN ~ Enter Correct Pin");
      return false;
    } else {
      let transation = [...this.#transationHistory];
      console.log("--------------------------------------------");
      console.log(
        `Account Holder Name: ${this.accountHolderName} \nAccount Number: ${this.accountNumber} \nTotal Balance is: ${this.#balance}`,
      );
      console.table(transation);
      console.log("--------------------------------------------");

      return true;
    }
  }
}

console.log(" ----------- ");

const amit = new BankAccount("Amit", 123, 1, 200);
console.log(amit);
amit.deposite(100);
amit.deposite(200);
amit.deposite(300);
amit.deposite(400);
amit.withdraw(600, 1);

// amit.deposite(100)
// amit.withdraw(100,1)
amit.checkBalance(1);
amit.getStatement(1);
let maya = new BankAccount("Maya", 101, 1010, 3000);
maya.deposite(200);
maya.withdraw(1200, 1010);
maya.getStatement(1010);
