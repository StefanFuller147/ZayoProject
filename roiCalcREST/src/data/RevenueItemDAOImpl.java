package data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import entities.RevenueItem;
@Transactional
@Repository
public class RevenueItemDAOImpl implements RevenueItemDAO{
	@PersistenceContext
	private EntityManager em;

	//gets a list of revenue items
	@Override
	public List<RevenueItem> index() {
		String query = "SELECT i FROM RevenueItem i";
		List<RevenueItem> revenueItem = em.createQuery(query, RevenueItem.class).getResultList();
		return revenueItem;
	}

	//gets an individual revenue item
	@Override
	public RevenueItem show(int id) {
		RevenueItem ri = em.find(RevenueItem.class, id);
		return ri;
	}

	//creates a new revenue item
	@Override
	public RevenueItem create(RevenueItem revenueItem) {
		em.persist(revenueItem);
		em.flush();
		return revenueItem;
	}

	//updates an existing revenue item
	@Override
	public RevenueItem update(RevenueItem revenueItem, int id) {
		RevenueItem managed = em.find(RevenueItem.class, id);
		managed.setMonthlyCost(revenueItem.getMonthlyCost());
		managed.setOneTimeCost(revenueItem.getOneTimeCost());
		managed.setName(revenueItem.getName());
		return managed;
	}

	//deletes an existing revenue item
	@Override
	public boolean removeRevenueItem(int id) {
		RevenueItem managed = em.find(RevenueItem.class, id);
		em.remove(managed);
		em.flush();
		
		if(em.find(RevenueItem.class, id) == null){
			return true;
		}else if(em.find(RevenueItem.class, id) != null){
			return false;
		}
		return false;
	}

}