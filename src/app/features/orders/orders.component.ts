import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { AuthService } from '../../core/auth/services/auth.service';
import { Order } from '../../core/models/order.interface';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  private readonly orderService = inject(OrderService);
  private readonly authService  = inject(AuthService);

  orders         = signal<Order[]>([]);
  isLoading      = signal(true);
  expandedOrderId = signal<string | null>(null); // tracks which order is expanded

  ngOnInit(): void {
    const userId = this.authService.userData().id;
    if (!userId) return;

    this.orderService.getUserOrders(userId).subscribe({
      next: (res: Order[]) => {
        this.orders.set(res);
        // Auto-expand the most recent order (first in list)
        if (res.length > 0) {
          this.expandedOrderId.set(res[0]._id);
        }
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  // ── Toggle expand ──────────────────────────────────────────────────────────
  toggleOrder(orderId: string): void {
    this.expandedOrderId.set(
      this.expandedOrderId() === orderId ? null : orderId
    );
  }

  isExpanded(orderId: string): boolean {
    return this.expandedOrderId() === orderId;
  }

  // ── Status helpers ─────────────────────────────────────────────────────────
  // Derive status label from isPaid + isDelivered
  getStatusLabel(order: Order): string {
    if (order.isDelivered) return 'Delivered';
    if (order.isPaid)      return 'On the way';
    return 'Processing';
  }

  getStatusClasses(order: Order): string {
    if (order.isDelivered) return 'bg-green-100 text-green-700';
    if (order.isPaid)      return 'bg-blue-100 text-blue-700';
    return 'bg-orange-100 text-orange-700';
  }

  // ── Item count helper ──────────────────────────────────────────────────────
  getTotalItems(order: Order): number {
    return order.cartItems.reduce((sum, item) => sum + item.count, 0);
  }

  // ── Date formatter ─────────────────────────────────────────────────────────
  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  }
}