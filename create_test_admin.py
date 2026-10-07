from backend.database import SessionLocal
from backend.models import User
from backend.auth import hash_password


db = SessionLocal()

existing_user = db.query(User).filter(
    User.username == "admin_test"
).first()

if existing_user:
    print("admin_test already exists")
else:
    admin = User(
        username="admin_test",
        email="admin.test@example.com",
        hashed_password=hash_password("AdminTest123"),
        role="ADMIN",
        is_active=True
    )

    db.add(admin)
    db.commit()

    print("Test ADMIN user created successfully.")

db.close()

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    username: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    role: Mapped[str] = mapped_column(
        String(30),
        nullable=False
    )

    action: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    target: Mapped[str] = mapped_column(
        String(100),
        nullable=True
    )

    old_value: Mapped[str] = mapped_column(
        String(500),
        nullable=True
    )

    new_value: Mapped[str] = mapped_column(
        String(500),
        nullable=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )