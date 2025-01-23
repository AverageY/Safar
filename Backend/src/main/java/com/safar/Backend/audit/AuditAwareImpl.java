package com.safar.Backend.audit;


import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component("auditAwareImpl")
public class AuditAwareImpl implements AuditorAware<String> {
    @Override
    public Optional<String> getCurrentAuditor() {
        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            return Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication().getName());
        }
        return Optional.of("SYSTEM"); // Default value when no user is authenticated
    }
}