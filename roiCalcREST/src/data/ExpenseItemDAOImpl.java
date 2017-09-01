package data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import entities.ExpenseItem;

@Transactional
@Repository
public class ExpenseItemDAOImpl implements ExpenseItemDAO {
	
	@PersistenceContext
	private EntityManager em;

	//gets the list of expense items
	@Override
	public List<ExpenseItem> index() {
		String query = "SELECT ei FROM ExpenseItem ei";
		List<ExpenseItem> expenseItem = em.createQuery(query, ExpenseItem.class).getResultList();
		return expenseItem;
	}

	//gets an individual expense item
	@Override
	public ExpenseItem show(int id) {
		ExpenseItem ei = em.find(ExpenseItem.class, id);
		return ei;
	}

	//creates an expense item
	@Override
	public ExpenseItem create(ExpenseItem expenseItem) {
		em.persist(expenseItem);
		em.flush();
		return expenseItem;
	}

	//updates an existing expense item
	@Override
	public ExpenseItem update(ExpenseItem expenseItem, int id) {
		ExpenseItem managed = em.find(ExpenseItem.class, id);
		managed.setMonthlyCost(expenseItem.getMonthlyCost());
		managed.setName(expenseItem.getName());
		managed.setOneTimeCost(expenseItem.getOneTimeCost());
		return managed;
	}

	//deletes an expense item
	@Override
	public boolean removeExpenseItem(int id) {
		ExpenseItem managed = em.find(ExpenseItem.class, id);
		em.remove(managed);
		em.flush();
		
		if(em.find(ExpenseItem.class, id) == null){
			return true;
		}else if(em.find(ExpenseItem.class, id) != null){
			return false;
		}
		return false;
	}

}
