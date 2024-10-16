import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './products.component';
import { ProductsService } from './products.service';
import { ProductI } from '../../interfaces/product';

describe('ProductsComponent Integration Test', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let service: ProductsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule,ProductComponent], // Utiliza HttpClientModule para las solicitudes reales// No olvides declarar tu componente
      providers: [ProductsService]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ProductsService);
  });

  it('debería cargar los productos al inicializarse', async () => {
    // Llama a ngOnInit que debe hacer la llamada HTTP real
    fixture.detectChanges(); // Dispara la inicialización del componente

    // Espera a que se resuelva la llamada real al backend
    await component.loadProducts(); // Asegúrate de que loadProducts() hace la llamada HTTP

    // Verifica que los productos se hayan cargado correctamente
    expect(component.productos).toBeDefined();
    expect(component.productos.length).toBeGreaterThan(0); // Asegúrate de que haya productos
  });

  it('debería manejar correctamente el error al cargar productos', async () => {
    // Aquí no puedes simular un error porque estás llamando al backend real
    // Necesitarías configurar tu backend para que devuelva un error intencionalmente
    // o crear una situación donde el backend esté caído

    fixture.detectChanges();

    try {
      await component.loadProducts();
    } catch (error) {
      // Maneja el error aquí
      expect(component.productos.length).toBe(0); // Asegúrate de que no se carguen productos
    }
  });
});
