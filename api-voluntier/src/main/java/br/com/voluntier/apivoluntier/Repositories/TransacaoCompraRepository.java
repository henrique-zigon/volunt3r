package br.com.voluntier.apivoluntier.Repositories;

import br.com.voluntier.apivoluntier.Models.TransacaoCompra;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransacaoCompraRepository extends JpaRepository<TransacaoCompra, Integer> {
}
