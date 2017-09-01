package data;

import java.util.List;

import entities.ExpenseItem;

public interface ExpenseItemDAO {
	//CRUD methods for Expense Items
	public List<ExpenseItem> index();
	public ExpenseItem show(int id);
	public ExpenseItem create(ExpenseItem expenseItem);
	public ExpenseItem update(ExpenseItem expenseItem, int id);
	public boolean removeExpenseItem(int id);
}
