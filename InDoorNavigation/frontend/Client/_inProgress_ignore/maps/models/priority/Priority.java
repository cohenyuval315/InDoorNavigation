
public class Priority {
    public static final int HIGH = 1;
    public static final int MEDIUM = 2;
    public static final int LOW = 3;

    private int priority;

    public Priority(int priority) {
        this.priority = priority;
    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }
}
