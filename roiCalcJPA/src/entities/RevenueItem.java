package entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "revenue_item")
public class RevenueItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	//fields
	private int id;
	@Column(name = "one_time_cost")
	private int oneTimeCost;
	@Column(name = "monthly_cost")
	private int monthlyCost;
	private String name;
	
	
	//getters and setters
	public int getId() {
		return id;
	}
	public int getOneTimeCost() {
		return oneTimeCost;
	}
	public void setOneTimeCost(int oneTimeCost) {
		this.oneTimeCost = oneTimeCost;
	}
	public int getMonthlyCost() {
		return monthlyCost;
	}
	public void setMonthlyCost(int monthlyCost) {
		this.monthlyCost = monthlyCost;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	//toString
	@Override
	public String toString() {
		return "RevenueItem [id=" + id + ", oneTimeCost=" + oneTimeCost + ", monthlyCost=" + monthlyCost + ", name="
				+ name + "]";
	}
	
	
	
}
