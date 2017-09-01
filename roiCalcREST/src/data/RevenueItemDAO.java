package data;

import java.util.List;

import entities.RevenueItem;

public interface RevenueItemDAO {
//CRUD methods for Revenue Item 
	public List<RevenueItem> index();
	public RevenueItem show(int id);
	public RevenueItem create(RevenueItem revenueItem);
	public RevenueItem update(RevenueItem revenueItem, int id);
	public boolean removeRevenueItem(int id);
	
}
