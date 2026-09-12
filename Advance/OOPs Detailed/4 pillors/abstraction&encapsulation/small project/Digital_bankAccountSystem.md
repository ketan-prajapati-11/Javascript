# Project: Digital Bank Account System
🎯 Core Goal

Build a BankAccount class that behaves like a real bank account — safe, validated, and with a clean public interface. No one outside the class should be able to directly tamper with balance or transaction history.

## Level 1 — Basic Structure (Encapsulation practice)

Requirements:

Fields: accountHolderName, accountNumber, #balance (private), #pin (private)
Constructor should accept accountHolderName, accountNumber, pin, and an optional initialBalance (default 0)
#balance and #pin must be private — no outside code should ever read or change them directly

Public methods to build:

deposit(amount) — adds money to balance
withdraw(amount, pin) — removes money, but only if PIN is correct
checkBalance(pin) — shows balance, but only if PIN is correct

Validation rules to enforce (this is the important part):

deposit(amount):
Reject if amount <= 0
withdraw(amount, pin):
Reject if PIN is wrong
Reject if amount <= 0
Reject if amount > balance (insufficient funds)
checkBalance(pin):
Reject if PIN is wrong

Think about: what should each method console.log when it fails? Should it throw an error, return false, or just print a message? (Try returning true/false from deposit/withdraw so the caller knows if it worked — good habit.

## Level 2 — Add Transaction History (Abstraction practice)

Requirements:

Add a private field #transactionHistory = []
Every successful deposit or withdraw should push a record like:
js
  { type: "DEPOSIT", amount: 500, date: new Date(), balanceAfter: 1500 }
Add a public method getStatement(pin) that:
Verifies PIN
Prints all transactions in a readable format (not just the raw array)

Design decision to think about: Should #transactionHistory ever be directly returned to the user? (Hint: No — if you return this.#transactionHistory, the user gets the actual array reference and could .push() fake transactions into it! Return a copy instead: return [...this.#transactionHistory].

## Level 3 — PIN Security (Real-world constraint logic)

Requirements:

Add a private field #failedAttempts = 0
If withdraw() or checkBalance() is called with the wrong PIN 3 times in a row, the account should lock.
Add a private field #isLocked = false
Once locked, no operation should work (even with the correct PIN) until an unlockAccount(correctPin) method is called successfully with... think about this: if the account is locked, should entering the correct PIN unlock it? Or should it require a separate admin/reset method? (Design decision — pick one and justify it to yourself.)
On any successful PIN entry, reset #failedAttempts back to 0